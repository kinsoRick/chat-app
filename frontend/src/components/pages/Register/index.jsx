import SecurityIllustration from '../../../assets/security.svg'
import RegisterForm from '../../RegisterForm'
import './index.scss'

const background = {
  background: "url('https://i.ibb.co/fD2k187/Photo.png')",
  width: "100vw",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
}

function Register() {
  return (
    <main className='container' style={background}>
      <div className="pane grid-form">
        <div className="left-box">
          <img
            src={SecurityIllustration}
            style={{
              height: 'auto',
              width: '90%',
              opacity: 0.7,
            }}
          />
        </div>
        <div className="right-box">
          <h1>Зарегистрироваться</h1>
          <RegisterForm></RegisterForm>
          <span>Есть аккаунт? <a href="/login">Войдите!</a></span>
        </div>
      </div>
    </main>
  )
}

export default Register