import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import SecurityIllustration from '../../assets/security.svg';
import LoginForm from '../../components/Forms/LoginForm';
import './index.scss';
import AuthContext from '../../contexts/AuthContext';

const Login = () => {
  const { setToken, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authorize = async (values) => axios
    .post('/api/v1/login', values)
    .then((res) => {
      setToken(res.data.token);
      setUsername(res.data.username);
      navigate('/');
    });

  return (
    <div className="background">
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
              <a href="/signup">
                {' '}
                {t('register')}
              </a>
            </span>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Login;
