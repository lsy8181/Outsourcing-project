import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/common/Layout';
import DetailPage from '../pages/DetailPage/DetailPage';
import EditPage from '../pages/EditPage/EditPage';
import editPageLoader from '../pages/EditPage/EditPage.loader';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage';

import SignUpPage from '../pages/SignUpPage';
import WritePage from '../pages/WritePage/WritePage';
import detailPageLoader from '../pages/DetailPage/DetailPage.loader';
import TermsOfService from '../pages/LoginPage/TermsOfService';
import MyPage from '../pages/MyPage/MyPage';
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
        element: <DetailPage />,
        loader: detailPageLoader
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
  },
  {
    path: '/service',
    element: <TermsOfService />
  }
]);
export default router;
