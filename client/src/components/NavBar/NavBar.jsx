import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css';
import logo from '../../assets/logo.png';
import { getQueryList, logOut } from '../../firebase/client';
import { useMainContext } from '../../context/Context';

export default function NavBar({ show }) {

  const navigate = useNavigate();

  const { setShowSaveQuery, setShowNav } = useMainContext();

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
          <a onClick={() => setShowSaveQuery(true)}><span>Guardar sentencia</span></a>
        </li>
        <li>
          <Link to='/list' onClick={() => setShowNav(false)}><span>Lista sentencias</span></Link>
        </li>
        <li>
          <Link to='/guide' onClick={() => setShowNav(false)}><span>Guias de comandos</span></Link>
        </li>
        <li>
          <Link to='/course' onClick={() => setShowNav(false)}><span>Cursos</span></Link>
        </li>
        <li>
          <Link to='/'><span>Acerca de</span></Link>
        </li>
        <li>
          <a onClick={handleLogOut}><span style={{ color: '#f54848' }}>Cerrar sesión</span></a>
        </li>
      </ul>
    </div>
  )
}