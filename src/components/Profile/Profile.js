import './Profile.css';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form className='profile__form'>
        <div className='profile__items-inputs'>
          <label className='profile__input-label' htmlFor='nameInput'>
            Имя
          </label>
          <input
            className='profile__item-input'
            id='nameInput'
            type='text'
            placeholder='Имя пользователя'
            name='name'
            minLength='2'
            maxLength='40'
            required
            autoComplete='off'
          />
        </div>
        <span className='profile__input-help inputName-err'></span>
        <div className='profile__items-inputs'>
          <label className='profile__input-label' htmlFor='emailInput'>
            E-mail
          </label>
          <input
            className='profile__item-input'
            id='emailInput'
            type='email'
            placeholder='Введите e-mail'
            name='email'
            minLength='2'
            maxLength='40'
            required
            autoComplete='off'
          />
        </div>
        <span className='profile__input-help inputEmail-err'></span>
        <p className='profile__btn btn'>Редактировать</p>
        <Link className='profile__btn profile__btn_type_exit btn' to={'/signin'}>
          Выйти из аккаунта
        </Link>
      </form>
    </div>
  );
}
