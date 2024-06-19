import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';

function MyPage() {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => api.user.getUserProfile()
  });

  const mutation = useMutation({
    mutationFn: api.user.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
    }
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (user) {
      setAvatarUrl(user.avatar_url);
      setNickname(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    const profileData = {
      id: user.id,
      avatar_url: avatar ? URL.createObjectURL(avatar) : user.avatar_url,
      firstName: nickname.split(' ')[0],
      lastName: nickname.split(' ')[1] || ''
    };
    mutation.mutate(profileData);
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
    <div className="w-[500px] flex flex-col border border-solid border-slate-300 rounded-xl mx-auto my-100 text-center gap-8 py-8 ">
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
