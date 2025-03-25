import { supabase } from "./supabase"

// Fetch data from a table
export async function fetchData(table: string) {
  const { data, error } = await supabase.from(table).select("*")
  return { data, error }
}

// Insert data into a table
export async function insertData(table: string, data: any) {
  const { data: result, error } = await supabase.from(table).insert(data).select()
  return { data: result, error }
}

// Update data in a table
export async function updateData(table: string, id: number, data: any) {
  const { data: result, error } = await supabase.from(table).update(data).eq("id", id).select()
  return { data: result, error }
}

// Delete data from a table
export async function deleteData(table: string, id: number) {
  const { error } = await supabase.from(table).delete().eq("id", id)
  return { error }
}

