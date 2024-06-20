import supabase from '../../supabase/supabase';

export default async function homePageLoader() {
  const response = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  return response;
}
