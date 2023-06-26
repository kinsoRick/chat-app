import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { useMemo } from 'react';
import { Provider } from 'react-redux';

import AuthContext from './contexts/AuthContext';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

import store from './store';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [token, setToken] = useLocalStorage('token', '');
  const auth = token !== '';

  const contextValues = useMemo(() => ({ setToken, auth }), [auth, setToken]);

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
      path: '/register',
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
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </Provider>

  );
}

export default App;
