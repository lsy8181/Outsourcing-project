import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/common/Layout';
import DetailPage from '../pages/DetailPage/DetailPage';
import EditPage from '../pages/EditPage/EditPage';
import editPageLoader from '../pages/EditPage/EditPage.loader';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import SignUpPage from '../pages/SignUpPage';
import WritePage from '../pages/WritePage/WritePage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/detail/:postId',
        element: <DetailPage />
      },
      {
        path: '/write',
        element: <WritePage />
      },
      {
        path: '/edit/:postId',
        element: <EditPage />,
        loader: editPageLoader
      },
      {
        path: '/my-page/:userId',
        element: <MyPage />
      }
    ]
  },
  {
    path: '/signUp',
    element: <SignUpPage />
  },
  {
    path: '/logIn',
    element: <LoginPage />
  }
]);
export default router;
