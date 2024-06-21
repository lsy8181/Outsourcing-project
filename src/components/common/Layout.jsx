import { useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ScrollToTop from './ScrollToTop';

// { nickname, avatarUrl }
const Header = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { isLoggedIn, user, logout, user_id } = useAuth();
  // console.log(typeof user_id);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const profileImageUrl = user?.profileImageUrl || 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg';
  const nickname = user?.nickname || '닉네임';

  return (
    <header className="bg-blue-100 p-2 mb-2 flex justify-between items-center">
      <h1 className="text-3xl font-semibold cursor-pointer hover:text-blue-700" onClick={() => navigate('/')}>
        Local Spot
      </h1>
      <div className="flex gap-2 items-center">
        {isLoggedIn ? (
          <>
            <Link
              to={`/my-page/${
                user_id || JSON.parse(localStorage.getItem('sb-xxeqrlcareyhdjuuyipu-auth-token')).user.id
              }`}
              className="flex gap-2 items-center"
            >
              <img src={profileImageUrl} alt="프로필 사진" width="60px" className="rounded-full" />
              <p className="mr-4 hover:font-semibold">{nickname}님</p>
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate('/write')}
            >
              추천 장소 등록하기
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate('/logIn')}
            >
              로그인
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate('/signUp')}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-blue-100 flex justify-center p-8 mt-2">
      <span className="text-sm">copyright ⓒ sparta coding club</span>
    </footer>
  );
};

const Layout = () => {
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const updateHeaderInfo = (newNickname, newAvatarUrl) => {
    setNickname(newNickname);
    setAvatarUrl(newAvatarUrl);
  };

  return (
    <>
      <ScrollToTop />
      {/* <Header nickname={nickname} avatarUrl={avatarUrl} /> */}
      <Header />
      <main className="flex-1">
        <Outlet context={{ updateHeaderInfo }} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
