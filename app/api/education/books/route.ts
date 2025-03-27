import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Get all books
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing environment variables:', { 
        hasUrl: !!supabaseUrl, 
        hasKey: !!supabaseKey 
      })
      throw new Error('Missing Supabase credentials')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    console.log('Books fetched:', data?.length || 0)
    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('Books API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books: ' + error.message },
      { status: 500 }
    )
  }
}

// Add a new book
export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const body = await request.json()
    const { data, error } = await supabase
      .from('books')
      .insert([body])
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to add book: ' + error.message },
      { status: 500 }
    )
  }
} 