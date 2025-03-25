import { supabase } from "./supabase"

// Sign in with GitHub
export async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  })
  return { data, error }
}

// Sign in with Google
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  })
  return { data, error }
}

// Sign in with Facebook
export async function signInWithFacebook() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
  })
  return { data, error }
}

