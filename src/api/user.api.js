import { v4 as uuidv4 } from 'uuid';
import { getId } from '../utils/getId';

class UserAPI {
  #supabase;

  constructor(supabase) {
    this.#supabase = supabase;
  }

  async getUserProfile() {
    try {
      const id = await getId();
      const { data, error } = await this.#supabase.from('users').select('*').eq('id', id);
      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err) {
      console.error('프로필 정보 가져오기에 실패했습니다.', err);
      throw err;
    }
  }

  updateProfile = async (profileData) => {
    console.log(profileData);
    const storage = localStorage.getItem('sb-xxeqrlcareyhdjuuyipu-auth-token');
    const accessToken = JSON.parse(storage);
    if (accessToken.access_token) {
      try {
        const id = await getId();
        const { error } = await this.#supabase.from('users').update(profileData).eq('id', id);
        if (error) {
          throw new Error(error.message);
        } else {
          const { data } = await this.#supabase.from('users').select('*').eq('id', id);
          console.log(data);
          return data;
        }
      } catch (err) {
        console.error('프로필 업데이트에 실패했습니다.', err);
        throw err;
      }
    } else {
      throw new Error('접근 토큰이 없습니다.');
    }
  };

  uploadAvatar = async (file) => {
    const { data: avatarData, error } = await this.#supabase.storage
      .from('avatars')
      .upload(`avatar/${uuidv4()}.png`, file);

    if (error) {
      console.log(error);
      return;
    }

    const { data } = this.#supabase.storage.from('avatars').getPublicUrl(avatarData.path);
    return data.publicUrl;
  };
}

export default UserAPI;
