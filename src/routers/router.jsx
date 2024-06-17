import { createBrowserRouter } from 'react-router-dom';
import Editpage from '../pages/Editpage';
import Readpage from '../pages/Readpage';
import Writepage from '../pages/Writepage';
import Joinpage from '../pages/Joinpage';
import Loginpage from '../pages/Loginpage';
import Mypage from '../pages/Mypage';
import Mainpage from '../pages/Mainpage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainpage />
  },
  {
    path: '/Readpage/:feedId',
    element: <Readpage />
  },
  {
    path: '/Writepage',
    element: <Writepage />
  },
  {
    path: '/Editpage/:feedId',
    element: <Editpage />
  },
  {
    path: '/Joinpage',
    element: <Joinpage />
  },
  {
    path: '/Description',
    element: <Description />
  },
  {
    path: '/Loginpage',
    element: <Loginpage />
  },
  {
    path: '/my-page/:userId',
    element: <Mypage />
  }
]);
export default router;
