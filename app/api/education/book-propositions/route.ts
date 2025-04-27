import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('📥 API route hit')
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const data = await request.json()
    console.log('📦 Received data:', data)

    const { data: insertedData, error } = await supabase
      .from('book_propositions')
      .insert([{
        title: data.title,
        synopsis: data.synopsis,
        main_ideas: data.main_ideas,
        author: data.author,
        status: 'pending'
      }])
      .select()

    if (error) {
      console.error('❌ Database error:', error)
      throw error
    }

    console.log('✅ Data inserted successfully:', insertedData)
    return NextResponse.json({ 
      message: 'Book proposition submitted successfully',
      data: insertedData
    })
  } catch (error: any) {
    console.error('❌ API error:', error)
    return NextResponse.json(
      { error: 'Failed to submit book proposition: ' + error.message },
      { status: 500 }
    )
  }
} 