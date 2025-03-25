import { supabase } from "./supabase"

// Subscribe to changes in a table
export function subscribeToChanges(table: string, callback: (payload: any) => void) {
  const subscription = supabase
    .channel(`public:${table}`)
    .on("postgres_changes", { event: "*", schema: "public", table }, callback)
    .subscribe()

  return subscription
}

