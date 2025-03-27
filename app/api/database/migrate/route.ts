import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Read and execute table migrations
    const tableSqlPath = path.join(process.cwd(), 'scripts', 'migrations', '001_create_education_tables.sql')
    const tableSqlContent = fs.readFileSync(tableSqlPath, 'utf8')

    const { error: tableError } = await supabase
      .sql(tableSqlContent)

    if (tableError) {
      console.error('Table migration error:', tableError)
      throw tableError
    }

    return NextResponse.json({ message: 'Migration completed successfully' })
  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: 'Failed to run migration: ' + error.message },
      { status: 500 }
    )
  }
} 