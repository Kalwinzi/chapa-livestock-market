
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ngyyteewquucikoptsiz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5neXl0ZWV3cXV1Y2lrb3B0c2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MTA0MTgsImV4cCI6MjA2NDI4NjQxOH0.9koXfs689WX9O0UHIa2RTSfvwFrjoVLH3ChjwPbECJo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
