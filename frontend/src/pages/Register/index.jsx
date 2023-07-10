import { useTranslation } from 'react-i18next';

import SecurityIllustration from '../../assets/security.svg';
import RegisterForm from '../../components/Forms/RegisterForm';
import './index.scss';

const Register = () => {
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
              alt="Illustration Register"
              src={SecurityIllustration}
              className='auth-illustration'
            />
          </div>

          <div className="right-box">
            <h1>{t('toRegister')}</h1>
            <RegisterForm />
            <span>
              {t('haveAccount')}
              <a href="/login">
                {' '}
                {t('goLogin')}
              </a>
            </span>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Register;
