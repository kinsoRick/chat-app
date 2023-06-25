import PropTypes from 'prop-types'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

import './index.scss'

function RegisterForm({ onSubmit }) {
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(48, 'Максимум 48 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(48, 'Максимум 48 символов')
      .required('Обязательное поле'),
    retypePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
  })

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
          retypePassword: '',
        }}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={loginSchema}
      >
        {({ errors, touched }) => (
          <Form className='register-form'>
            <div className="floating-field">
              <Field id="username" name="username" placeholder="nickname" va />
              <label htmlFor="username">Имя пользователя</label>
              {errors.username && touched.username ? <div className='input-error'>{errors.username}</div> : null}
            </div>

            <div className="floating-field">
              <Field id="password" name="password" type="password" placeholder="qwerty" />
              <label htmlFor="password">Пароль</label>
              {errors.password && touched.password ? <div className='input-error'>{errors.password}</div> : null}
            </div>

            <div className="floating-field">
              <Field id="retypePassword" name="retypePassword" type="password" placeholder="qwerty" />
              <label htmlFor="retypePassword">Повторите пароль</label>
              {errors.retypePassword && touched.retypePassword ? <div className='input-error'>{errors.retypePassword}</div> : null}
            </div>

            
            <button type='submit' className='btn'>
              Отправить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func
}

export default RegisterForm