import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = 'https://plevcfudvytjcvopihkk.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZXZjZnVkdnl0amN2b3BpaGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1OTg0OTksImV4cCI6MjAzMzE3NDQ5OX0.pssQQvnkPJCkXEUL_iu8Q8m0inwIUaUkzWWsewDcIAw';

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export default supabase;
