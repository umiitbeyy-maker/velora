import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Business = {
  id: string
  name: string
  slug: string
  industry: string
  description: string
  language: string
  services: any[]
  working_hours: any
  agent_config: any
  is_active: boolean
}