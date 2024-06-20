import { useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

const Header = ({ nickname, avatarUrl }) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  return (
    <header className="bg-blue-100 p-4 mb-2 flex justify-between items-center">
      <h1 className="text-3xl font-semibold cursor-pointer hover:text-blue-700" onClick={() => navigate('/')}>
        추천합시다👍🏻
      </h1>
      <div className="flex gap-2 items-center">
        {/* 로그인이 안 되어 있는 경우에 보여줄 UI */}
        {/* <button
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
        </button> */}
        {/* 로그인이 되어 있는 경우에 보여줄 UI */}
        <Link to={`/my-page/${userId}`} className="flex gap-2 items-center">
          <img src={avatarUrl} alt="임시 프로필 사진" width="60px" className="rounded-full" />
          <p className="mr-4 hover:font-semibold">{nickname}님, 안녕하세요!</p>
        </Link>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/write')}
        >
          추천 장소 등록하기
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">로그아웃</button>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-blue-100 flex justify-center p-14 mt-2">
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
      <Header nickname={nickname} avatarUrl={avatarUrl} />
      {/* <main className="flex flex-col justify-center items-center h-full"> */}
      <main>
        <Outlet updateHeaderInfo={updateHeaderInfo} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
