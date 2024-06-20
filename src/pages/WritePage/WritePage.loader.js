import { redirect } from 'react-router-dom';
import supabase from '../../supabase/supabase';

export default async function writePageLoader() {
  const res = await supabase.auth.getSession();

  if (res.data.session === null) {
    return redirect('/login');
  }

  return null;
}
