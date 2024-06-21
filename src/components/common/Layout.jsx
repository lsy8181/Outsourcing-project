import { useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getId } from '../../utils/getId';
import ScrollToTop from './ScrollToTop';

const Header = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { isLoggedIn, user, logout, user_id } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const profileImageUrl = user?.profileImageUrl || 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg';
  const nickname = user?.nickname || '닉네임';

  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 mb-2 shadow-md flex justify-between items-center">
      <h1
        className="text-4xl font-bold flex justify-center items-center text-white text-center cursor-pointer hover:text-yellow-300"
        onClick={() => navigate('/')}
      >
        Local Spot
      </h1>
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <Link
              to={`/my-page/${
                user_id || JSON.parse(localStorage.getItem('sb-xxeqrlcareyhdjuuyipu-auth-token')).user.id
              }`}
              className="flex gap-2 items-center"
            >
              <img
                src={profileImageUrl}
                alt="프로필 사진"
                width="60px"
                className="rounded-full border-2 border-white"
              />
              <p className="mr-4 text-white hover:font-semibold">{nickname}님</p>
            </Link>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate('/write')}
            >
              추천 장소 등록하기
            </button>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate('/logIn')}
            >
              로그인
            </button>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
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
    <footer className="bg-gradient-to-r from-blue-400 to-blue-600 flex justify-center p-8 mt-2">
      <span className="text-sm text-white">© 2024 Sparta Coding Club. All rights reserved.</span>
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
      <Header />
      <main className="flex-1 bg-gray-100 p-4">
        <Outlet context={{ updateHeaderInfo }} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
