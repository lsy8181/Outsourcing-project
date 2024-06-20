import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import { useParams } from 'react-router-dom';

function MyPage({ updateHeaderInfo }) {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => api.user.getUserProfile()
  });

  const mutation = useMutation({
    mutationFn: api.user.updateProfile,
    onSuccess: (data) => {
      console.log(data);
      if (data && data.firstName && data.lastName) {
        queryClient.invalidateQueries(['userProfile']);
        updateHeaderInfo(`${data.firstName} ${data.lastName}`, data.avatar_url);
        localStorage.setItem('avatarUrl', data.avatar_url);
      } else {
        console.error('프로필 업데이트 실패: 사용자 정보 확인 바람');
      }
    }
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (user) {
      const storedAvatarUrl = localStorage.getItem('avatarUrl');
      const storedNickname = localStorage.getItem('nickname');
      setAvatarUrl(storedAvatarUrl || user.avatar_url);
      setNickname(`${user.firstName} ${user.lastName}`);
      console.log('avatar URL:', storedAvatarUrl || user.avatar_url);
      console.log('nickname:', storedNickname || `${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) {
      console.error('유저 데이터가 없습니다.');
      return;
    }

    let avatar_url = user.avatar_url;

    if (avatar || nickname !== `${user.firstName} ${user.lastName}`) {
      try {
        // 이미지 업로드
        if (avatar) {
          console.log(avatar);
          avatar_url = await uploadAvatarAndGetUrl(avatar);
          console.log(avatar_url);
        }

        const profileData = {
          avatar_url: avatar_url,
          firstName: nickname.split(' ')[0],
          lastName: nickname.split(' ')[1] || ''
        };

        // 프로필 업데이트 요청
        const updatedUser = await mutation.mutateAsync(profileData);

        if (updatedUser && updatedUser.firstName && updatedUser.lastName) {
          updateHeaderInfo(`${updatedUser.firstName} ${updatedUser.lastName}`, updatedUser.avatar_url);
          localStorage.setItem('avatarUrl', updatedUser.avatar_url);
          localStorage.setItem('nickname', `${updatedUser.firstName} ${updatedUser.lastName}`);
          setAvatarUrl(updatedUser.avatar_url);
          setNickname(`${updatedUser.firstName} ${updatedUser.lastName}`);
        } else {
          console.error('프로필 업데이트 실패: 사용자 정보 확인!');
        }
      } catch (error) {
        console.error('프로필 업데이트 실패', error);
      }
    }
  };

  const uploadAvatarAndGetUrl = async (file) => {
    console.log(file);
    try {
      const uploadedImageResponse = await api.user.uploadAvatar(file);
      console.log(uploadedImageResponse);
      return uploadedImageResponse;
    } catch (error) {
      throw new Error('이미지 업로드 실패');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(file);
      setAvatarUrl(url);
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[500px] flex flex-col border border-solid border-slate-300 rounded-xl mx-auto my-24 text-center gap-8 py-8 ">
      <h2>프로필 수정</h2>
      <div className="flex flex-row mx-auto items-center gap-12">
        <div className="flex flex-col gap-5 px-6">
          <label htmlFor="avatar">이미지 변경하기</label>
          <img src={avatarUrl} alt="프로필 이미지" className="bg-slate-300 w-32 h-32 rounded-full object-cover" />
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
