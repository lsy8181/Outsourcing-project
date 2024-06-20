import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../api/api';
import { useOutletContext, useParams } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import supabase from '../../supabase/supabase';

function MyPage() {
  const { updateHeaderInfo } = useOutletContext();
  const { userId } = useParams();
  // console.log(userId);

  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => api.user.getUserProfile(userId) // userId를 이용하여 프로필 조회
  });
  console.log('user', user);
  console.log(userId);

  const mutation = useMutation({
    mutationFn: (profileData) => api.user.updateProfile(profileData),
    onSuccess: (user) => {
      if (user && user[0].firstName) {
        queryClient.invalidateQueries(['userProfile', userId]);
        const nickName = user[0].firstName + user[0].lastName;
        updateHeaderInfo(nickName, user[0].avatar_url);
      } else {
        console.error('프로필 업데이트 실패: 사용자 정보 확인 바람');
      }
    },
    onError: (error) => {
      console.error('mutation error:', error);
    }
  });

  // const [avatar, setAvatar] = useState(null);
  // const [avatarUrl, setAvatarUrl] = useState(null);
  const [nickname, setNickname] = useState(user ? `${user[0].firstName} ${user[0].lastName}` : '');

  // useEffect(() => {
  //   if (user && user.length > 0) {
  //     const { avatar_url, firstName, lastName } = user[0];
  //     setAvatarUrl(avatar_url);
  //     setNickname(`${firstName} ${lastName}`);
  //   }
  // }, [user, avatarUrl]);
  // console.log(avatarUrl);
  useEffect(() => {
    if (user && user.length > 0) {
      const { firstName, lastName } = user[0];
      setNickname(`${firstName} ${lastName}`);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) {
      console.error('유저 데이터가 없습니다.');
      return;
    }

    // let avatar_url = user[0].avatar_url;
    let firstName = nickname;
    // let lastName = user[0].lastName;

    // if (avatar || nickname !== `${user[0].firstName} ${user[0].lastName}`) {
    try {
      // if (avatar) {
      //   avatar_url = await uploadAvatarAndGetUrl(avatar_url);
      // }
      const profileData = {
        // avatar_url,
        firstName
        // lastName: user[0].lastName
      };
      await mutation.mutateAsync(profileData);
    } catch (error) {
      console.error('프로필 업데이트 실패', error);
    }
    // }
  };
  // const uploadAvatarAndGetUrl = async (file) => {
  //   console.log('....', file);
  //   try {
  //     const uploadedImageResponse = await api.user.uploadAvatar(file);
  //     console.log('uploadedImageResponse', uploadedImageResponse);

  //     return uploadedImageResponse; // avatar_url 속성 반환
  //   } catch (error) {
  //     throw new Error('이미지 업로드 실패');
  //   }
  // };

  // const handleImageChange = (e) => {
  //   // const file = e.target.files[0];
  //   // console.log(file);
  //   // if (file) {
  //   //   const url = URL.createObjectURL(file);
  //   //   setAvatar(file);
  //   //   setAvatarUrl(url);
  //   // }
  //   // if (uploadAvatar) {
  //   //   setAvatar();
  //   // }
  // };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const defaultUserPic = 'https://ifh.cc/g/dgyJCA.png';
  const [userPic, setUserPic] = useState(defaultUserPic);
  // const { userId } = useParams();

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!userId) {
        setUserPic(defaultUserPic);
        return;
      }

      const { data, error } = await supabase.storage.from('avatars').getPublicUrl(`avatar/avatar_${userId}.png`);
      if (error) {
        console.error('Fetch Image Error:', error.message);
        setUserPic(defaultUserPic);
        return;
      }

      const imageUrl = data.publicUrl;

      try {
        const response = await fetch(imageUrl, { method: 'HEAD' });
        if (response.ok) {
          setUserPic(`${imageUrl}?t=${new Date().getTime()}`);
        } else {
          console.error('Image URL is not accessible:', response.statusText);
          setUserPic(defaultUserPic);
        }
      } catch (error) {
        console.error('URL Test Error:', error.message);
        setUserPic(defaultUserPic);
      }
    };

    fetchImageUrl();
  }, [userId]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPic(reader.result);
      };
      reader.readAsDataURL(file);

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`avatar/avatar_${userId}.png`, file, { upsert: true });
      if (error) {
        console.error('Upload Error:', error.message);
      } else if (data) {
        const { publicUrl } = supabase.storage.from('avatars').getPublicUrl(data.path).data;
        setUserPic(`${publicUrl}?t=${new Date().getTime()}`);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[500px] flex flex-col border border-solid border-slate-300 rounded-xl mx-auto my-24 text-center gap-8 py-8">
      <h2>프로필 수정</h2>
      <div className="flex flex-row mx-auto items-center gap-12">
        <div className="flex flex-col gap-5 px-6">
          <label htmlFor="avatar">이미지 변경하기</label>
          <img src={userPic} alt="프로필 이미지" className="bg-slate-300 w-32 h-32 rounded-full object-cover" />
          <button
            className="py-2 px-4 bg-slate-400 rounded text-white mx-auto transition ease-in-out hover:bg-slate-500"
            onClick={() => document.getElementById('fileInput').click()}
          >
            파일 선택
          </button>
          <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="nickname">이름 변경하기</label>
          <input
            type="text"
            placeholder="닉네임"
            minLength="1"
            maxLength="10"
            value={nickname}
            onChange={handleNicknameChange}
            className="h-8 rounded border border-solid border-slate-300"
          />
        </div>
      </div>
      <button
        className="py-2 px-4 bg-slate-400 rounded text-white mx-auto transition ease-in-out hover:bg-slate-500"
        onClick={handleUpdateProfile}
      >
        프로필 업데이트
      </button>
    </div>
  );
}
export default MyPage;
