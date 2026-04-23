import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/config";

let browserClient: SupabaseClient<Database, "public"> | null = null;

export function getBrowserSupabaseClient() {
  if (typeof window === "undefined") {
    throw new Error("getBrowserSupabaseClient must run in the browser.");
  }

  if (!browserClient) {
    browserClient = createClient<Database, "public">(getSupabaseUrl(), getSupabaseAnonKey());
  }

  return browserClient;
}
