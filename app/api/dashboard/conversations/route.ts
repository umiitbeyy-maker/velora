import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const businessId = req.nextUrl.searchParams.get('businessId')
  if (!businessId) return NextResponse.json({ error: 'Missing businessId' }, { status: 400 })
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('business_id', businessId)
    .order('updated_at', { ascending: false })
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ conversations: data })
}
