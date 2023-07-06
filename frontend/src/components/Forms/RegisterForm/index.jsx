import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import './index.scss';
import AuthContext from '../../../contexts/AuthContext';

const RegisterForm = () => {
  const { t } = useTranslation();
  const { setToken, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errorType'))
      .max(20, t('errorType'))
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, t('passwordLengthMin'))
      .max(48, 'Максимум 48 символов')
      .required('Обязательное поле'),
    retypePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
          retypePassword: '',
        }}
        validationSchema={registerSchema}
        onSubmit={async ({ username, password }, { resetForm, setFieldError }) => {
          try {
            const res = await axios.post('/api/v1/signup', { username, password });
            setToken(res.data.token);
            setUsername(res.data.username);
            navigate('/');
            resetForm();
          } catch (err) {
            const errorCode = err.response?.data?.statusCode;
            switch (errorCode) {
              case 409:
                setFieldError('username', t('nicknameOwned'));
                break;
              default:
                throw new Error(`Unexpected error: ${err.message}`);
            }
          }
        }}
      >

        {({ errors, touched }) => (
          <Form className="register-form">

            <div className="floating-field">
              <Field id="username" name="username" placeholder="nickname" />
              <label htmlFor="username">{t('usernameRegister')}</label>
              {errors.username && touched.username ? <div className="input-error">{errors.username}</div> : null}
            </div>

            <div className="floating-field">
              <Field id="password" name="password" type="password" placeholder="qwerty" />
              <label htmlFor="password">{t('password')}</label>
              {errors.password && touched.password ? <div className="input-error">{errors.password}</div> : null}
            </div>

            <div className="floating-field">
              <Field id="retypePassword" name="retypePassword" type="password" placeholder="qwerty" />
              <label htmlFor="retypePassword">{t('retypePassword')}</label>
              {errors.retypePassword && touched.retypePassword ? <div className="input-error">{errors.retypePassword}</div> : null}
            </div>

            <button type="submit" className="btn">
              {t('send')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
