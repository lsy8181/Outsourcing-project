import supabase from '../supabase/supabase';
import CommentAPI from './comment.api';
import PostAPI from './post.api';
import UserAPI from './user.api';

class API {
  #supabase;

  post;
  comment;
  user;

  constructor() {
    this.#supabase = supabase;
    console.log(this.#supabase);
    this.post = new PostAPI(this.#supabase);
    this.comment = new CommentAPI(this.#supabase);
    this.user = new UserAPI(this.#supabase);
  }
}

const api = new API();

export default api;
