import './Burger.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import closeIcon from '../../images/closeIcon.svg';

export default function Burger({ isOpen, onClose }) {

  //закрытие по esc
  function handleEscClose(evt) {
    evt.key === 'Escape' && onClose();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  });

  return (
    <div
      className={`burger
    ${isOpen ? 'burger_opened' : ''}`}
      onClick={onClose}
    >
      <div className='burger__container'>
        <button className='burger__btn-close' type='button'>
          <img
            className='burger__btn-close-pic btn'
            src={closeIcon}
            alt='Закрыть'
            onClick={onClose}
          />
        </button>
        <ul className='burger__items'>
          <li className='burger__item'>
            <Link to='/' className='burger__item'>
              Главная
            </Link>
          </li>
          <li className='burger__item'>
            <Link to='/movies' className='burger__item'>
              Фильмы
            </Link>
          </li>
          <li className='burger__item'>
            <Link to='/saved-movies' className='burger__item'>
              Сохранённые фильмы
            </Link>
          </li>
          <li className='burger__item'>
            <Link to='/profile' className='burger__item burger__item-account'>
              Аккаунт
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
