
// Import AsyncStorage from react-native-async-storage to handle persistent storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Import createClient function from Supabase to initialize a client instance
import { createClient } from '@supabase/supabase-js'

// Define the Supabase project URL (unique to the Supabase instance)
const SUPABASE_URL = "https://rmlrpxxdrzrqtvodkdvy.supabase.co";
// Define the Supabase anonymous public API key for authentication
const SUPABASE_ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtbHJweHhkcnpycXR2b2RrZHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyNjIwNjIsImV4cCI6MjA1MjgzODA2Mn0.uxVzyi3wAh1iZQXBbtZcgzC-I6-GyxCKt9RwbzkNGF0`; 

// Create and export a Supabase client instance with authentication settings
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage, // Use AsyncStorage to persist authentication state
        autoRefreshToken: true, // Enable automatic token refresh for session management
        persistSession: true, // Persist user session even after app restarts
        detectSessionInUrl: false, // Disable session detection from URL (not needed in React Native)
      },
    })