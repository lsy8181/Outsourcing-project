import { useEffect, useState } from 'react';
import { updateProfile } from '../auth';

function MyPage() {
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('avatarUrl') || '');
  const [nickname, setNickname] = useState('');

  const handleUpdateProfile = async () => {
    console.log(avatar);
    console.log(nickname);

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('avatar', avatar);
    const response = await updateProfile(formData);

    if (response) {
      // 프로필 업데이트 성공 시, 로컬스토리지에 저장
      localStorage.setItem('avatarUrl', avatarUrl);
      localStorage.setItem('nickname', nickname);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setAvatar(file);
        const url = URL.createObjectURL(file);
        setAvatarUrl(url);
        // 이미지 URL 로컬스토리지에 저장
        localStorage.setItem('avatarUrl', url);
      } catch (err) {
        console.log('이미지 가져오기에 실패했습니다.', err);
        setAvatarUrl('');
      }
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    localStorage.setItem('nickname', e.target.value);
  };

  useEffect(() => {
    const storedAvatarUrl = localStorage.getItem('avatarUrl');
    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl);
    }

    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  return (
    <div className="w-[500px] flex flex-col border border-solid border-slate-300 rounded-xl mx-auto text-center gap-8 py-8 ">
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
