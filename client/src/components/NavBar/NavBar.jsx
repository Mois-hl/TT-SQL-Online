import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css';
import logo from '../../assets/logo.png';
import { logOut } from '../../firebase/client';
import { useMainContext } from '../../context/Context';

export default function NavBar({ show }) {

  const navigate = useNavigate();

  const { setShowSaveQuery, setShowNav } = useMainContext();

  const { currentUser } = useMainContext()

  async function handleLogOut() {
    logOut()
    .then(() => {
      navigate('/login');
    })
    .catch(err =>{
      console.log(err);
    })
  }

  return (
    <div className={ show ? 'sidebar active' : 'sidebar'}>
      <img className='image-logo-sidebar' src={logo} alt='Logo' />
      <ul>
        <li>
          <Link to='/' onClick={() => setShowNav(false)}><span>Inicio</span></Link>
        </li>
        <li>
        { currentUser && <a onClick={() => setShowSaveQuery(true)}><span>Guardar sentencia</span></a> }
        </li>
        <li>
        { currentUser && <Link to='/list' onClick={() => setShowNav(false)}><span>Lista sentencias</span></Link> }
        </li>
        <li>
          <Link to='/guide' onClick={() => setShowNav(false)}><span>Guía de comandos</span></Link>
        </li>
        <li>
        { currentUser && <Link to='/course' onClick={() => setShowNav(false)}><span>Laboratorio</span></Link> }
        </li>
        <li>
          <Link to='/about'><span>Acerca de</span></Link>
        </li>
        <li>
          { currentUser && <a onClick={handleLogOut}><span style={{ color: '#f54848' }}>Cerrar sesión</span></a> }
          { !currentUser && <Link to='login'><span style={{ color: '#09f' }}>Iniciar sesión</span></Link> }
        </li>
      </ul>
    </div>
  )
}