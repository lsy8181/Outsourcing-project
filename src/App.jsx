import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SignupContextProvider } from './context/SignupContext';
import ModalContextProvider from './hooks/useModal';
import ToastProvider from './hooks/useToast';
import QueryProvider from './query/QueryProvider';
import router from './routes/router';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
