import './Logo.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Logo() {
  return (
        <Link className='logo' to='/signin'>
        <img className='logo__pic' src={logo} alt='Логотип' />
      </Link>
     );
}