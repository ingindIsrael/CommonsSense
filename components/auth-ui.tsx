"use client"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/utils/supabase"

export default function AuthUI() {
  return (
    <div className="max-w-md mx-auto p-6">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#dc2626",
                brandAccent: "#b91c1c",
              },
            },
          },
        }}
        providers={["google", "facebook", "github"]}
      />
    </div>
  )
}

