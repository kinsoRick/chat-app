import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

const useAuthorization = () => {
  const [token, setToken] = useLocalStorage('token', '');
  const [username, setUsername] = useLocalStorage('username', '');

  const contextValues = useMemo(
    () => ({
      token,
      setToken,
      username,
      setUsername,
      auth: token !== '',
    }),
    [token, setToken, username, setUsername],
  );

  return contextValues;
};

export default useAuthorization;
