import { RouterProvider } from 'react-router-dom';
import ModalContextProvider from './hooks/useModal';
import QueryProvider from './query/QueryProvider';
import router from './routes/router';
import { SignupContextProvider } from './context/SignupContext';

function App() {
  return (
    <QueryProvider>
      <SignupContextProvider>
        <ModalContextProvider>
          <RouterProvider router={router} />
        </ModalContextProvider>
      </SignupContextProvider>
    </QueryProvider>
  );
}

export default App;
