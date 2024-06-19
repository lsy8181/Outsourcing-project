import { RouterProvider } from 'react-router-dom';
import ModalContextProvider from './hooks/useModal';
import ToastProvider from './hooks/useToast';
import QueryProvider from './query/QueryProvider';
import router from './routes/router';

function App() {
  return (
    <QueryProvider>
      <ModalContextProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ModalContextProvider>
    </QueryProvider>
  );
}

export default App;
