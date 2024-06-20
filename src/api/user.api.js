class UserAPI {
  #supabase;

  constructor(supabase) {
    this.#supabase = supabase;
  }

  async updateProfile(formData) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await this.#supabase.patch('users', formData);
        return response;
      } catch (err) {
        console.error('프로필 업데이트에 실패했습니다.', err);
        throw err;
      }
    }
  }
}

export default UserAPI;
