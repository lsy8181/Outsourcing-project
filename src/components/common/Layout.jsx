import { Outlet, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-100 p-6 mb-2 flex justify-between items-center">
      <h1 className="text-3xl font-semibold cursor-pointer hover:font-bold" onClick={() => navigate('/')}>
        추천합시다👍🏻
      </h1>
      <div className="flex gap-2">
        {/* 로그인이 안 되어 있는 경우에 보여줄 버튼 */}
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/log-in')}
        >
          로그인
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/sign-up')}
        >
          회원가입
        </button> */}
        {/* 로그인이 되어 있는 경우에 보여줄 버튼 */}
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
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center h-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
