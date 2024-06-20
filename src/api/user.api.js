import { v4 as uuidv4 } from 'uuid';
import { getId } from '../utils/getId';

class UserAPI {
  #supabase;

  constructor(supabase) {
    console.log(supabase);
    this.#supabase = supabase;
  }

  async getUserProfile() {
    try {
      const id = await getId();
      console.log(id);
      const { data, error } = await this.#supabase.from('users').select('*').eq('id', id);
      console.log(data);
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
    const accessToken = localStorage.getItem('accessToken');
    console.log('accessToken:', accessToken);
    if (accessToken) {
      const id = getId();
      try {
        const { data, error } = await this.#supabase.from('users').update(profileData).eq('id', id).single();

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (err) {
        console.error('프로필 업데이트에 실패했습니다.', err);
        throw err;
      }
    } else {
      throw new Error('접근 토큰이 없습니다.');
    }
  };

  uploadAvatar = async (file) => {
    console.log(file);
    const { data: avatarData, error } = await this.#supabase.storage
      .from('avatars')
      .upload(`avatar/${uuidv4()}.png`, file);
    console.log('data:', avatarData);

    if (error) {
      console.log(error);
      return;
    }

    const { data } = this.#supabase.storage.from('avatars').getPublicUrl(avatarData.path);
    console.log('data:', data);
    return data.publicUrl;
  };
}

export default UserAPI;
