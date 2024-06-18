import supabase from '../supabase/supabase';
import PostAPI from './post.api';

class API {
  #supabase;

  post;

  constructor() {
    this.#supabase = supabase;

    this.post = new PostAPI(this.#supabase);
  }
}

const api = new API();

export default api;
