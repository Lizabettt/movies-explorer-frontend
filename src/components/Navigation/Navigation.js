import { Link } from 'react-router-dom';
import './Navigation.css';
// import menu from '../../images/menu.svg';

export default function Navigation({ isOpen }) {
  return (
    <section className='navigation'>
      <ul className='header__navigation-items'>
        <li className='header__navigation-item'>
          <ul className='header__navigation-items-films'>
            <li className='header__navigation-item-films'>
              <Link className='header__navigation-item-film' to='/movies'>
                Фильмы
              </Link>
            </li>
            <li className='header__navigation-item-films'>
              <Link
                className='header__navigation-item-film'
                to='/saved-movies'
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
        </li>
        <li className='header__navigation-item'>
          <Link className='header__navigation-account btn' to='/profile'>
            Аккаунт
          </Link>

          {/* <button
            className='header__navigation-item-burger btn'
            onClick={isOpen}
          >
            <img src={menu} alt='Бургер меню' />
          </button> */}
        </li>
      </ul>
    </section>
  );
}
