
import SecurityIllustration from '../../../assets/security.svg'
import LoginForm from '../../LoginForm'
import './index.scss'

const background = {
  background: "url('https://i.ibb.co/fD2k187/Photo.png')",
  width: "100vw",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
}

function Login() {
  return (
    <main className='container' style={background}>
      <div className="pane grid-form">
        <div className="left-box">
          <img
            src={SecurityIllustration}
            style={{
              height: 'auto',
              width: '90%',
            }}
          />
        </div>
        <div className="right-box">
          <h1>Войти</h1>
          <LoginForm  onSubmit={(e) => console.log(e)}/>
          <span>Нет аккаунта? <a href="/register">Зарегистрируйтесь!</a></span>
        </div>
      </div>
    </main>
  )
}

export default Login