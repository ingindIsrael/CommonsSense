import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

type BookStatus = 'current reading' | 'past reading' | 'upcoming reading'

interface Book {
  title: string
  synopsis: string
  main_ideas: string
  status: BookStatus
}

interface Movie {
  title: string
  synopsis: string
  genre: string
  release_date: string
}

const books: Book[] = [
  {
    title: 'The Communist Manifesto',
    synopsis: 'A foundational text that outlines the basic principles of communism and critiques capitalism.',
    main_ideas: 'Class struggle, Historical materialism, Critique of capitalism, Workers revolution',
    status: 'current reading' as BookStatus
  },
  {
    title: 'Capital: Volume I',
    synopsis: 'A comprehensive critique of political economy and detailed analysis of capitalism.',
    main_ideas: 'Labor theory of value, Commodity fetishism, Surplus value, Capital accumulation',
    status: 'upcoming reading' as BookStatus
  },
  {
    title: 'State and Revolution',
    synopsis: 'Analysis of the state, democracy, and the role of the proletariat in revolution.',
    main_ideas: 'State theory, Revolutionary strategy, Democracy and dictatorship, Transition period',
    status: 'past reading' as BookStatus
  },
  {
    title: 'Reform or Revolution',
    synopsis: 'Critique of reformist tendencies and defense of revolutionary socialism.',
    main_ideas: 'Revolutionary strategy, Critique of reformism, Class consciousness, Socialist organization',
    status: 'upcoming reading' as BookStatus
  }
]

const movies: Movie[] = [
  {
    title: 'Pride',
    synopsis: 'Based on true events about LGBT activists supporting Welsh miners during their 1984 strike.',
    genre: 'Historical Drama',
    release_date: '2014-09-12'
  },
  {
    title: 'Salt of the Earth',
    synopsis: 'Story of Mexican-American workers struggle for equality and decent working conditions.',
    genre: 'Drama',
    release_date: '1954-03-14'
  },
  {
    title: 'Matewan',
    synopsis: 'Dramatization of the 1920 coal miners strike in West Virginia.',
    genre: 'Historical Drama',
    release_date: '1987-08-28'
  },
  {
    title: 'Land and Freedom',
    synopsis: 'Story about the Spanish Civil War and the complexities of revolutionary politics.',
    genre: 'War Drama',
    release_date: '1995-05-07'
  }
]

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    console.log('Attempting to insert books:', JSON.stringify(books, null, 2))
    const { error: booksError } = await supabase
      .from('books')
      .insert(books)

    if (booksError) {
      console.error('Books seeding error:', booksError)
      throw booksError
    }

    console.log('Attempting to insert movies:', JSON.stringify(movies, null, 2))
    const { error: moviesError } = await supabase
      .from('movies')
      .insert(movies)

    if (moviesError) {
      console.error('Movies seeding error:', moviesError)
      throw moviesError
    }

    return NextResponse.json({ message: 'Database seeded successfully' })
  } catch (error: any) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database: ' + error.message },
      { status: 500 }
    )
  }
} 