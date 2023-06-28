import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import './index.scss';

function LoginForm({ onSubmit }) {
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(48, 'Максимум 48 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(3, 'Минимум 3 символов')
      .max(48, 'Максимум 48 символов')
      .required('Обязательное поле'),
  });

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={loginSchema}
    >

      {({ errors, touched }) => (
        <Form className="login-form">

          <div className="floating-field">
            <Field id="username" name="username" placeholder="nickname" />
            <label htmlFor="username">{t('username')}</label>
            {errors.username && touched.username ? <div className="input-error">{errors.username}</div> : null}
          </div>

          <div className="floating-field">
            <Field id="password" name="password" type="password" placeholder="qwerty" />
            <label htmlFor="password">{t('password')}</label>
            {errors.password && touched.password ? <div className="input-error">{errors.password}</div> : null}
          </div>

          <button type="submit" className="btn">
            {t('send')}
          </button>
        </Form>
      )}
    </Formik>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
