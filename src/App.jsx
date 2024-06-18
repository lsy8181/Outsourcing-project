import { RouterProvider } from 'react-router-dom';
import ModalContextProvider from './hooks/useModal';
import QueryProvider from './query/QueryProvider';
import router from './routes/router';

function App() {
  return (
    <QueryProvider>
      <ModalContextProvider>
        <RouterProvider router={router} />
      </ModalContextProvider>
    </QueryProvider>
  );
}

export default App;
