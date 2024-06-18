import supabase from '../../supabase/supabase';

export default async function editPageLoader({ params }) {
  const { postId } = params;
  const response = await supabase.from('posts').select().eq('post_id', postId);
  // console.log('EDIT LOADER___', response);
  return response;
}
