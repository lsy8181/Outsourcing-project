import supabase from '../supabase/supabase';
import PostAPI from './post.api';
import UserAPI from './user.api';

class API {
  #supabase;

  post;

  constructor() {
    this.#supabase = supabase;

    this.post = new PostAPI(this.#supabase);
    this.user = new UserAPI(this.#supabase);
  }
}

const api = new API();

export default api;
