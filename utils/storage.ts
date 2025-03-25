import { supabase } from "./supabase"

// Upload a file to storage
export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file)
  return { data, error }
}

// Download a file from storage
export async function downloadFile(bucket: string, path: string) {
  const { data, error } = await supabase.storage.from(bucket).download(path)
  return { data, error }
}

// Get a public URL for a file
export async function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

