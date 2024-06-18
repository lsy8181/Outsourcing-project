import { createBrowserRouter } from 'react-router-dom';
import EditPage from '../pages/EditPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import ReadPage from '../pages/ReadPage';
import SignUpPage from '../pages/SignUpPage';
import WritePage from '../pages/WritePage';
import Layout from '../components/common/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/feeds/:feedId',
    element: <ReadPage />
  },
  {
    path: '/write',
    element: <WritePage />
  },
  {
    path: '/edit/:feedId',
    element: <EditPage />
  },
  {
    path: '/signUp',
    element: <SignUpPage />
  },
  {
    path: '/logIn',
    element: <LoginPage />
  },
  {
    path: '/my-page/:userId',
    element: <MyPage />
  }
]);

export default router;
