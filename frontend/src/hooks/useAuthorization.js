import useLocalStorage from './useLocalStorage';

const useAuthorization = () => {
  const [token, setToken] = useLocalStorage('token', '');
  const [username, setUsername] = useLocalStorage('username', '');

  return {
    token,
    setToken,
    username,
    setUsername,
    auth: token !== '',
  };
};

export default useAuthorization;
