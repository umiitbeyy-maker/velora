import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { supabase } from '@/lib/supabase'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  const { message, sessionId, businessSlug } = await req.json()

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', businessSlug || 'glamour-beauty')
    .single()

  const systemPrompt = business
    ? `You are an AI assistant for ${business.name}.
       Industry: ${business.industry}.
       Description: ${business.description}.
       Services: ${JSON.stringify(business.services)}.
       Help customers, answer questions, book appointments.
       If customer wants to book: collect name, contact, service, preferred time.`
    : 'You are a helpful business assistant.'

  const { data: conv } = await supabase
    .from('conversations')
    .select('messages')
    .eq('session_id', sessionId)
    .single()

  const history = conv?.messages || []
  const updatedHistory = [...history, { role: 'user', content: message }]

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      ...updatedHistory
    ],
    max_tokens: 500,
  })

  const reply = response.choices[0].message.content
  const finalHistory = [...updatedHistory, { role: 'assistant', content: reply }]

  await supabase.from('conversations').upsert({
    session_id: sessionId,
    business_id: business?.id,
    messages: finalHistory,
    updated_at: new Date().toISOString()
  }, { onConflict: 'session_id' })

  return NextResponse.json({ reply, business })
}