import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import path from 'path'

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

async function fetchAndSaveSchema() {
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

    // Fetch foreign keys
    const { data: foreignKeys, error: fkError } = await supabase
      .from('information_schema.key_column_usage')
      .select('*')
      .eq('table_schema', 'public')

    if (fkError) throw fkError

    const schema = {
      tables: tables,
      columns: columns,
      foreignKeys: foreignKeys,
      exportedAt: new Date().toISOString()
    }

    // Save to a file
    await fs.writeFile(
      path.join(process.cwd(), 'schema/supabase-schema.json'),
      JSON.stringify(schema, null, 2)
    )

    console.log('Schema exported successfully')
  } catch (error) {
    console.error('Error exporting schema:', error)
  }
}

export { fetchAndSaveSchema } 