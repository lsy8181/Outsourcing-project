class PostAPI {
  #supabase;

  constructor(supabase) {
    this.#supabase = supabase;
  }

  async createPost(newPostData) {
    const response = await this.#supabase.from('posts').insert(newPostData);
    // console.log('API CREATE POST___', response);
    return response;
  }

  async updatePost(newPostData) {
    const response = await this.#supabase.from('posts').update(newPostData).eq('post_id', newPostData.post_id);
    // console.log('API UPDATE POST___', response);
    return response;
  }

  async deletePost(deletePostId) {
    const response = await this.#supabase.from('posts').delete().eq('post_id', deletePostId);
    // console.log('API DELETE POST___', response);
    return response;
  }

  async getPost(postId) {
    const response = await this.#supabase.from('posts').select('*,likes(like_id,user_id)').eq('post_id', postId);
    // console.log('API GET POST___', response);
    return response;
  }

  async getPosts() {
    const { data } = await this.#supabase.from('posts').select('*').order('created_at', { ascending: false });
    return data;
  }

  async fetchPlaces({ pageParam = 0 }) {
    const pageSize = 4; // 페이지당 데이터 수
    const start = pageParam * pageSize; // 시작 인덱스
    const end = start + pageSize - 1; // 끝 인덱스

    const { data, error } = await this.#supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) console.error('Error fetching posts:', error);

    return data;
  }
}

export default PostAPI;
