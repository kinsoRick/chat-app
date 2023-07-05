import PropTypes from 'prop-types';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import './index.scss';

const LoginForm = ({ onSubmit }) => {
  const { t } = useTranslation();

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('usernameMinLength'))
      .max(20, t('usernameMaxLength'))
      .required(t('usernameRequired')),
    password: Yup.string()
      .required(t('passwordRequired')),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setFieldError, resetForm }) => {
        try {
          await onSubmit(values);
          resetForm();
        } catch (err) {
          const errorCode = err.response?.data?.statusCode;
          switch (errorCode) {
            case 401:
              setFieldError('username', t('loginFailed'));
              break;
            default:
              throw new Error(`Unexpected error: ${err.message}`);
          }
        }
      }}
    >
      <Form className="login-form">
        <div className="floating-field">
          <Field id="username" name="username" placeholder={t('nickname')} />
          <label htmlFor="username">{t('username')}</label>
          <ErrorMessage name="username" component="div" className="input-error" />
        </div>

        <div className="floating-field">
          <Field id="password" name="password" type="password" placeholder={t('passwordPlaceholder')} />
          <label htmlFor="password">{t('password')}</label>
          <ErrorMessage name="password" component="div" className="input-error" />
        </div>

        <button type="submit" className="btn">
          {t('send')}
        </button>
      </Form>
    </Formik>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
