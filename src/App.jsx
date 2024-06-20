import { RouterProvider } from 'react-router-dom';
import ModalContextProvider from './hooks/useModal';
import ToastProvider from './hooks/useToast';
import QueryProvider from './query/QueryProvider';
import router from './routes/router';
import { SignupContextProvider } from './context/SignupContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//TODO 삭제 시 유저 아이디 비교 후 자기꺼만 삭제할 수 있도록 해야함.
//TODO 댓글도 로그인 해야만 쓸 수 있도록 해야함.
//TODO loader에 Protected 추가
//TODO user_id 하드코딩 되어있는거 변경해야함.


function App() {
  return (
    <QueryProvider>
      {/* <ReactQueryDevtools initialIsOpen={false}> */}
      <ModalContextProvider>
          <SignupContextProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </SignupContextProvider>
      </ModalContextProvider>
      {/* </ReactQueryDevtools> */}
    </QueryProvider>
  );
}

export default App;
