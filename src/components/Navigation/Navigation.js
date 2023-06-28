import './Navigation.css';

import { Link } from 'react-router-dom';
import menu from '../../images/menu.svg';

export default function Navigation({ isOpen }) {
  return (
    <div className='navigation'>
      <div className='navigation__items'>
        <div className='navigation__item'>
          <ul className='navigation__items-films'>
            <li className='navigation__item-films'>
              <Link className='navigation__item-film' to='/movies'>
                Фильмы
              </Link>
            </li>
            <li className='navigation__item-films'>
              <Link className='navigation__item-film' to='/saved-movies'>
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
        </div>
        <div className='navigation__item'>
          <Link className='navigation__account btn' to='/profile'>
            Аккаунт
          </Link>
          <button className='navigation__burger btn' onClick={isOpen}>
            <img src={menu} alt='Бургер меню' />
          </button>
        </div>
      </div>
    </div>
  );
}
