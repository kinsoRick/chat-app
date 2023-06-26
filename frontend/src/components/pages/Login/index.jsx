import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SecurityIllustration from '../../../assets/security.svg';
import LoginForm from '../../LoginForm';
import './index.scss';
import AuthContext from '../../../contexts/AuthContext';

const background = {
  background: "url('https://i.ibb.co/fD2k187/Photo.png')",
  width: '100vw',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
};

function Login() {
  const { auth, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const authorize = (values) => {
    axios.post('/api/v1/login', values).then((res) => {
      setToken(res.data.token);
    });
  };

  useEffect(() => {
    if (auth) navigate('/');
  });

  return (
    <main className="container" style={background}>
      <div className="pane grid-form">
        <div className="left-box">
          <img
            alt="Registration Illustration"
            src={SecurityIllustration}
            style={{
              height: 'auto',
              width: '90%',
              opacity: 0.7,
            }}
          />
        </div>
        <div className="right-box">
          <h1>Войти</h1>
          <LoginForm onSubmit={(values) => authorize(values)} />
          <span>
            Нет аккаунта?
            <a href="/register"> Зарегистрируйтесь!</a>
          </span>
        </div>
      </div>
    </main>
  );
}

export default Login;
