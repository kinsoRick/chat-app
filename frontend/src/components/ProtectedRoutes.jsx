import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const ProtectedRoutes = () => {
  const { auth } = useContext(AuthContext);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
