class LikeAPI {
  #supabase;

  constructor(supabase) {
    this.#supabase = supabase;
  }

  async likePost(likePostData) {
    const response = await this.#supabase.from('likes').insert(likePostData);
    console.log('API LIKE POST___', response);
    return response;
  }

  async disLikePost({ post_id, user_id }) {
    const response = await this.#supabase.from('likes').delete().match({ post_id, user_id });
    console.log('API DISLIKE POST___', response);
    return response;
  }

  async getLike({ post_id, user_id }) {
    const { data } = await this.#supabase.from('likes').select('*').match({ post_id, user_id });
    console.log('API GET LIKE___', data);
    return data;
  }
}

export default LikeAPI;
