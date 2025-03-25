import { supabase } from "./supabase"

// Sign up a new user
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

// Sign in an existing user
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

// Sign out the current user
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Get the current user
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

