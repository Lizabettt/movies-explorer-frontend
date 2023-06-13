import { Link, useLocation } from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header() {
  const location = useLocation();

  return (
    <header className='header'>
      <Link className='header__logo' to='/signin'>
        <img className='header__logo-pic' src={logo} alt='Логотип' />
      </Link>
      <div className='header__box'>
        {location.pathname === '/' ? (
          <ul className='header__navigation-items'>
            <li className='header__navigation-item'>
              <Link className='header__navigation-link btn' to='/signup'>
                Регистрация
              </Link>
            </li>
            <li className='header__navigation-item'>
              <Link className='header__navigation-link btn' to='/signin'>
                Войти
              </Link>
            </li>
          </ul>
        ) : (
          <Navigation />
        )}
      </div>
    </header>
  );
}
