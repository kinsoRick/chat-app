import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useAuthorization from '../hooks/useAuthorization';
import { actions as channelsActions } from '../store/channelsSlice';
import getData from '../store/actions/getData';

const ProtectedRoutes = () => {
  const { token, setToken, setUsername } = useAuthorization();
  const error = useSelector((state) => state.channels.error);
  const status = useSelector((state) => state.channels.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'logout') {
      setToken('');
      setUsername('');
    }

    if (status === 'idle') {
      if (token !== '') dispatch(getData(token));
    } else if (status === 'error') {
      if (error === 401) {
        setToken('');
      }
      dispatch(channelsActions.resetError());
      dispatch(channelsActions.setStatus('idle'));
    }
  }, [dispatch, status, token, setToken, error, setUsername]);

  return token !== '' ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
