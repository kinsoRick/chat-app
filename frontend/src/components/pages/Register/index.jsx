import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SecurityIllustration from '../../../assets/security.svg';
import RegisterForm from '../../RegisterForm';
import './index.scss';
import AuthContext from '../../../contexts/AuthContext';

const background = {
  background: "url('https://i.ibb.co/fD2k187/Photo.png')",
  width: '100vw',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
};

function Register() {
  const { auth, setToken, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const register = (values) => {
    const { username, password } = values;
    setError(null);

    axios.post('/api/v1/signup', { username, password }).then((res) => {
      setToken(res.data.token);
      setUsername(res.data.username);
      navigate('/');
    })
      .catch((err) => {
        if (err.response.data.statusCode === 409) {
          setError('Такой ник уже занят!');
        }
      });
  };

  useEffect(() => {
    if (auth) navigate('/');
  });

  return (
    <main className="container" style={background}>
      <div className="pane grid-form">
        <div className="left-box">
          <img
            alt="Illustration login"
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
          <RegisterForm onSubmit={register} error={error} />
          <span>
            Есть аккаунт?
            <a href="/login"> Войдите!</a>
          </span>
        </div>
      </div>
    </main>
  );
}

export default Register;
