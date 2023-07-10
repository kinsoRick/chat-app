import { useTranslation } from 'react-i18next';

import SecurityIllustration from '../../assets/security.svg';
import LoginForm from '../../components/Forms/LoginForm';
import './index.scss';

const Login = () => {
  const { t } = useTranslation();

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
              alt="Login Illustration"
              src={SecurityIllustration}
              className="auth-illustration"
            />
          </div>

          <div className="right-box">
            <h1>{t('login')}</h1>

            <LoginForm />

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
