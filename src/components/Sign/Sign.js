import './Sign.css';

import { Link } from 'react-router-dom';

export default function Sign() {
  return (
    <div className='sign'>
      <ul className='sign__items'>
        <li className='sign__item'>
          <Link className='sign__link btn' to='/signup'>
            Регистрация
          </Link>
        </li>
        <li className='sign__item'>
          <Link className='sign__link btn' to='/signin'>
            Войти
          </Link>
        </li>
      </ul>
    </div>
  );
}
