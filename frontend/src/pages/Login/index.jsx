import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import SecurityIllustration from '../../assets/security.svg';
import LoginForm from '../../components/Forms/LoginForm';
import './index.scss';
import AuthContext from '../../contexts/AuthContext';

const background = {
  background: "url('https://i.ibb.co/fD2k187/Photo.png')",
  width: '100vw',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

function Login() {
  const { setToken, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authorize = (values) => {
    axios
      .post('/api/v1/login', values).then((res) => {
        setToken(res.data.token);
        setUsername(res.data.username);
        navigate('/');
      })
      .catch((err) => {
        if (err.response.data.statusCode === 401) {
          toast.error(t('loginFailed'));
        }
      });
  };

  return (
    <div style={background}>
      <nav className="nav-pane">
        <div className="nav-content">
          <a href="/">Hexlet Chat</a>
        </div>
      </nav>
      <main className="container">

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
            <h1>{t('login')}</h1>

            <LoginForm onSubmit={(values) => authorize(values)} />

            <span>
              {t('notAccount')}
              <a href="/register">
                {' '}
                {t('register')}
              </a>
            </span>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Login;
