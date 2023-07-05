import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as ErrorProvider, ErrorBoundary } from '@rollbar/react';
import AuthContext from './contexts/AuthContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

import store from './store';
import ProtectedRoutes from './components/ProtectedRoutes';
import useAuthorization from './hooks/useAuthorization';

const rollbarConfig = {
  accessToken: 'b9fa851c18ea413d9bb1df620f6a4dd6',
  environment: 'testenv',
};

const App = () => {
  const authValues = useAuthorization();

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authValues}>
        <ErrorProvider config={rollbarConfig}>
          <ErrorBoundary>
            <Router>
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
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
