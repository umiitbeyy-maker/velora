import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('is_active', true)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ businesses: data })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, industry, description, services, language } = body

    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now()

    const { data, error } = await supabase
      .from('businesses')
      .insert({
        name,
        slug,
        industry,
        description: description || '',
        services: services || [],
        language: language || 'en',
        agent_config: {
          greeting: `Hi! I am the AI assistant for ${name}. How can I help you today?`,
          tone: 'friendly',
          can_book: true
        },
        is_active: true
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ business: data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
