import { Outlet, Navigate } from 'react-router-dom';
import useAuthorization from '../hooks/useAuthorization';

const ProtectedRoutes = () => {
  const { token } = useAuthorization();
  return token !== '' ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
