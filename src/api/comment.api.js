class CommentAPI {
  #supabase;

  constructor(supabase) {
    this.#supabase = supabase;
  }

  async getComments(postId) {
    const response = await this.#supabase.from('comments').select('*, users(email)').eq('post_id', postId);
    // console.log('API GET COMMENTS___', response);
    return response;
  }

  async createComment(newCommentData) {
    const response = await this.#supabase.from('comments').insert(newCommentData);
    // console.log('API CREATE COMMENT___', response);
    return response;
  }

  async deleteComment(commentId) {
    const response = await this.#supabase.from('comments').delete().eq('comment_id', commentId);
    // console.log('API DELETE COMMENT___', response);
    return response;
  }
}

export default CommentAPI;
