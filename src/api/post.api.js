class PostAPI {
  #supabase;

  constructor(supabase) {
    this.#supabase = supabase;
  }

  async createPost(newPostData) {
    const response = await this.#supabase.from('posts').insert(newPostData);
    console.log('API CREATE POST___', response);
    return response;
  }

  async updatePost(newPostData) {
    const response = await this.#supabase.from('posts').update(newPostData).eq('post_id', newPostData.post_id);
    console.log('API UPDATE POST___', response);
    return response;
  }

  async deletePost(deletePostId) {
    const response = await this.#supabase.from('posts').delete().eq('post_id', deletePostId);
    console.log('API DELETE POST___', response);
    return response;
  }

  async getPosts() {
    const { data } = await this.#supabase.from('posts').select('*').order('created_at', { ascending: false });
    console.log('API GET POST___', data);
    return data;
  }
}

export default PostAPI;
