import useLocalStorage from './useLocalStorage';

const useAuthorization = () => {
  // А зачем копировать код с хука стораджа?
  // Как по мне задел на будущее, чтобы использовать тот же сторадж для хранения темы
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
