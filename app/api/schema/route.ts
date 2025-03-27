import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials in environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function GET() {
  try {
    // Fetch tables and their definitions
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('*')
      .eq('table_schema', 'public')

    if (tablesError) throw tablesError

    // Fetch columns for each table
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('*')
      .eq('table_schema', 'public')

    if (columnsError) throw columnsError

    const schema = {
      tables,
      columns,
      exportedAt: new Date().toISOString()
    }

    return NextResponse.json(schema)
  } catch (error) {
    console.error('Error fetching schema:', error)
    return NextResponse.json({ error: 'Failed to fetch schema' }, { status: 500 })
  }
} 