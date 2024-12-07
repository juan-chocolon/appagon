import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://lwalerozouvkixzofzxf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YWxlcm96b3V2a2l4em9menhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwODc1MzIsImV4cCI6MjA0ODY2MzUzMn0.Qq9WHr4ndqzerFVmhUD2Ke4fo5tX5Apw4khK807jdNM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})