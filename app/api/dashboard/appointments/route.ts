import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const businessId = req.nextUrl.searchParams.get('businessId')
  if (!businessId) return NextResponse.json({ error: 'Missing businessId' }, { status: 400 })
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ appointments: data })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { business_id, customer_name, customer_contact, service, appointment_date } = body
  const { data, error } = await supabase
    .from('appointments')
    .insert({ business_id, customer_name, customer_contact, service, appointment_date, status: 'pending' })
    .select()
    .single()
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ appointment: data })
}
