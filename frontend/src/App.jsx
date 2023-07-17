import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as ErrorProvider, ErrorBoundary } from '@rollbar/react';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

import store from './store';
import ProtectedRoutes from './components/ProtectedRoutes';
import rollbarConfig from './configs/rollbar.config';
import SocketProvider from './socket';

const App = () => (
  <Provider store={store}>
    <SocketProvider>
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
    </SocketProvider>
  </Provider>

);

export default App;
