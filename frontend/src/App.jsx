import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as ErrorProvider, ErrorBoundary } from '@rollbar/react';
import AuthContext from './contexts/AuthContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

import store from './store';
import useLocalStorage from './hooks/useLocalStorage';

const rollbarConfig = {
  accessToken: 'b9fa851c18ea413d9bb1df620f6a4dd6',
  environment: 'testenv',
};

const App = () => {
  const [token, setToken] = useLocalStorage('token', '');
  const [username, setUsername] = useLocalStorage('username', '');
  const auth = token !== '';

  const contextValues = useMemo(
    () => ({
      token, setToken, auth, username, setUsername,
    }),
    [token, setToken, auth, username, setUsername],
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Register />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <Provider store={store}>
      <AuthContext.Provider value={contextValues}>
        <ErrorProvider config={rollbarConfig}>
          <ErrorBoundary>
            <RouterProvider router={router} />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ErrorBoundary>
        </ErrorProvider>
      </AuthContext.Provider>
    </Provider>

  );
};

export default App;
