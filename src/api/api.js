import supabase from '../supabase/supabase';
import CommentAPI from './comment.api';
import LikeAPI from './like.api';
import PostAPI from './post.api';
import UserAPI from './user.api';

class API {
  #supabase;

  post;
  comment;
  user;
  like;

  constructor() {
    this.#supabase = supabase;
    this.post = new PostAPI(this.#supabase);
    this.comment = new CommentAPI(this.#supabase);
    this.user = new UserAPI(this.#supabase);
    this.like = new LikeAPI(this.#supabase);
  }
}

const api = new API();

export default api;
