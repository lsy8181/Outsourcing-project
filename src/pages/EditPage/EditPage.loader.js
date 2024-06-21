import { redirect } from 'react-router-dom';
import api from '../../api/api';
import supabase from '../../supabase/supabase';

export default async function editPageLoader({ params }) {
  const res = await supabase.auth.getSession();

  if (res.data.session === null) {
    return redirect('/login');
  }

  const { postId } = params;
  const response = await api.post.getPost(postId);
  const data = localStorage.getItem('user');

  if (!data) return redirect('/login');

  const { user_id } = JSON.parse(data);

  if (user_id !== response.data[0].user_id) return redirect('/');
  // console.log('EDIT LOADER___', response);
  return response;
}
