import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SignupContextProvider } from './context/SignupContext';
import ModalContextProvider from './hooks/useModal';
import ToastProvider from './hooks/useToast';
import QueryProvider from './query/QueryProvider';
import router from './routes/router';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//TODO 삭제 시 유저 아이디 비교 후 자기꺼만 삭제할 수 있도록 해야함.
//TODO 댓글도 로그인 해야만 쓸 수 있도록 해야함.

function App() {
  return (
    <QueryProvider>
      {/* <ReactQueryDevtools initialIsOpen={false}> */}
      <ModalContextProvider>
        <SignupContextProvider>
          <AuthProvider>
            <ToastProvider>
              <RouterProvider router={router} />
            </ToastProvider>
          </AuthProvider>
        </SignupContextProvider>
      </ModalContextProvider>
      {/* </ReactQueryDevtools> */}
    </QueryProvider>
  );
}

export default App;
