import { Link, useLocation } from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo.svg';
import menu from '../../images/menu.svg';

export default function Header({ isOpen }) {
  const location = useLocation();

  return (
    <header className='header'>
      <Link className='header__logo' to='/signin'>
        <img className='header__logo-pic' src={logo} alt='Логотип' />
      </Link>
      <div className='header__box'>
        {location.pathname === '/signin' && (
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
        )}
        {location.pathname === '/' && (
          <ul className='header__navigation-items'>
            <li className='header__navigation-item'>
              <Link className='header__navigation-item-films' to='/movies'>
                Фильмы
              </Link>

              <Link
                className='header__navigation-item-films'
                to='/saved-movies'
              >
                Сохранённые фильмы
              </Link>
            </li>

            <li className='header__navigation-item'>
              <Link className='header__navigation-account btn' to='/profile'>
                {' '}
                Аккаунт
              </Link>

              <button
                className='header__navigation-item-burger btn'
                onClick={isOpen}
                             >
                <img src={menu} alt='Бургер меню>' />
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
