import { Link } from 'react-router-dom'
import './NavBar.css';

export default function NavBar() {
  return (
    <div className='navbar'>
      <h1>SQL editor online</h1>

      <ul>
        <li>
          <Link to='/test'><span>Query</span></Link>
        </li>
      </ul>
    </div>
  )
}