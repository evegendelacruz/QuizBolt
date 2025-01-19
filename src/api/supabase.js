import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://rmlrpxxdrzrqtvodkdvy.supabase.co";
const SUPABASE_ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtbHJweHhkcnpycXR2b2RrZHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyNjIwNjIsImV4cCI6MjA1MjgzODA2Mn0.uxVzyi3wAh1iZQXBbtZcgzC-I6-GyxCKt9RwbzkNGF0`; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })