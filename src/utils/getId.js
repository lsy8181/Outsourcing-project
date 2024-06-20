import supabase from '../supabase/supabase';

export const getId = async () => {
  const {
    data: {
      session: {
        user: { id }
      }
    },
    error
  } = await supabase.auth.getSession();
  console.log(id);
  return id;
};
