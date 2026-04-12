import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('is_active', true)
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ businesses: data })
}

export async function POST(req: Request) {
  const { name, industry, description, services, language } = await req.json()
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .trim()
  const { data, error } = await supabase
    .from('businesses')
    .insert({
      name, slug, industry, description, services, language,
      agent_config: {
        greeting: `Hi! I am the AI assistant for ${name}. How can I help?`,
        tone: 'friendly',
        can_book: true
      }
    })
    .select()
    .single()
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ business: data })
}