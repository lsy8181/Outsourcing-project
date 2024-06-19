import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = 'https://xxeqrlcareyhdjuuyipu.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZXFybGNhcmV5aGRqdXV5aXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3MTAzODQsImV4cCI6MjAzNDI4NjM4NH0.34tlyAXBh4YaTotFaCmri56J8GANT9k2Nf0ikJOLMcc';

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export default supabase;
