// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mwkucbvcfnggzlutzqws.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13a3VjYnZjZm5nZ3psdXR6cXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3ODEyMzEsImV4cCI6MjA3NDM1NzIzMX0.lRPe-SFL5nMHf5ldgOxvKoy5fFIHqqg53co1RE40TKc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
