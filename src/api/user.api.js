class UserAPI {
  #supabase;

  constructor(supabase) {
    this.#supabase = supabase;
  }

  // async getUserProfile() {
  //   try {
  //     const { data, error } = await this.#supabase.from('users').select('id, avatar_url, firstName, lastName').single();
  //     if (error) {
  //       throw new Error(error.message);
  //     }
  //     return data;
  //   } catch (err) {
  //     console.error('프로필 정보 가져오기에 실패했습니다.', err);
  //     throw err;
  //   }
  // }

  async updateProfile(profileData) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const { data, error } = await this.#supabase
          .from('users')
          .update(profileData)
          .update(profileData)
          .match({ id: profileData.id });
        if (error) {
          throw new Error(error.message);
        }
        return data;
      } catch (err) {
        console.error('프로필 업데이트에 실패했습니다.', err);
        throw err;
      }
    }
  }
}

export default UserAPI;
