import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"
import { createClient } from "@supabase/supabase-js"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, businessSlug } = await req.json()
    const { data: business } = await supabase.from("businesses").select("*").eq("slug", businessSlug).single()
    const systemPrompt = business ? `You are an AI assistant for ${business.name}. Industry: ${business.industry}. Services: ${JSON.stringify(business.services)}. Help customers and book appointments.` : "You are a helpful assistant."
    const { data: conv } = await supabase.from("conversations").select("messages").eq("session_id", sessionId).single()
    const history = conv?.messages || []
    const updated = [...history, { role: "user", content: message }]
    const response = await groq.chat.completions.create({ model: "llama-3.3-70b-versatile", messages: [{ role: "system", content: systemPrompt }, ...updated], max_tokens: 500 })
    const reply = response.choices[0].message.content
    await supabase.from("conversations").upsert({ session_id: sessionId, business_id: business?.id, messages: [...updated, { role: "assistant", content: reply }], updated_at: new Date().toISOString() }, { onConflict: "session_id" })
    return NextResponse.json({ reply })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
