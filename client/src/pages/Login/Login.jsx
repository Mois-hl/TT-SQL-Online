import { useRef, useState, useEffect } from 'react';
import './Login.css'
import logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";
import { useAuth, logOut, loginWithEmail, singUp } from '../../firebase/client';
import Loading from '../../components/Loading/Loading';

export default function Login() {

  const currentUser = useAuth();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  // sign up
  async function handleSingUp() {
    setLoading(true)
    singUp(emailRef.current.value, passwordRef.current.value).then(() => {
      setLoading(false)
    })
      .catch(err => {
        console.log(err.code);
        console.log(err.message);
        setLoading(false)
      })

  }
  // con asycn y await hay que usar try-catch // sign up con email y contraseña
  async function handleLogIn() {
    setLoading(true)
    loginWithEmail(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        console.log(err.code);
        console.log(err.message);
        setLoading(false)
      })
  }
  // con promises // sing up con github
  async function handleLoginWithGithub() {
    setLoading(true)
    loginWithGitHub()
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }
  // log out
  async function handleLogOut() {
    setLoading(true)
    try {
      await logOut()
    } catch {
      alert('error')
    }
    setLoading(false)
  }

  // Cambiar a / si hay un usuario loggeado
  useEffect(() => {
    setLoading(true)
    if(currentUser)
      navigate('/')
    setLoading(false)
  }, [currentUser])

  return (
    <div className="layout-login">
      <div className='main-container-login'>
        <img className='image-logo-login' src={logo} alt='Logo' />
        <p style={{ color: '#0e293d', fontSize: '16px' }}>SQL online</p>
        <p style={{ color: '#0e293d', fontSize: '12px', textAlign: 'center' }}>Aprende a programar en<br />lenguaje SQL 👩‍💻👨‍💻</p>
        <div className='inputs-login'>
          <input ref={emailRef} placeholder='email' />
          <input ref={passwordRef} type='password' placeholder='password' />
        </div>
        {
          !currentUser &&
          <button className='button-login' disabled={loading} onClick={handleLogIn}>
            Iniciar sesión
          </button>
        }
        {
          !currentUser &&
          <button className='button-signup-login' disabled={loading} onClick={handleSingUp}>
            Crear cuenta
          </button>
        }
        {
          currentUser &&
          <button className='button-logout-login' disabled={loading} onClick={handleLogOut}>
            Cerrar sesión
          </button>
        }
        {
          loading && <Loading />
        }
        {/* {
                !currentUser &&
                <Button onClick={handleLoginWithGithub}>
                    <GitHub fill='#fff' width={12} height={12} />Login with GitHub
                </Button>
                } */}
        {/* {
                currentUser &&
                <Avatar
                    alt='foto usuario'
                    src={currentUser.photoURL}
                    text={currentUser.email}
                />
                } */}
      </div>
    </div>
  );
}