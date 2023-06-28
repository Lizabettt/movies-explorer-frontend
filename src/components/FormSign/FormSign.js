import './FormSign.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

export default function FormSign({
  name,
  title,
  children,
  btnText,
  question,
  linkAfterBtn,
}) {
  return (
    <div className='formSign'>
      <div className='formSign-box'>
        <Logo />
        <h2 className='formSign__title'> {title} </h2>
        <form
          className='formSign__form'
          action='formSign__form'
          name='formSign__name'
          method='post'
          noValidate
        >
          {children}

          <div className='formSign__items-inputs'>
            <label className='formSign__input-label' htmlFor='emailInput'>
              E-mail
            </label>
            <input
              className='formSign__item-input'
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
          <span className='formSign__input-help inputEmail-err'></span>
          <div className='formSign__items-inputs'>
            <label className='formSign__input-label' htmlFor='passwordInput'>
              Пароль
            </label>
            <input
              className='formSign__item-input'
              id='passwordInput'
              type='text'
              placeholder='Введите пароль'
              name='password'
              minLength='2'
              maxLength='40'
              required
              autoComplete='off'
            />
          </div>
          <span className='formSign__input-help inputPassword-err'></span>
          <div className={`formSign-btn-box formSign-btn-box_type-${name}`}>
            <button className='formSign__btn ' type='submit'>
              {btnText}
            </button>
          </div>
        </form>
        <div className='formSign-afterBtn-box'>
          <p className='formSign__question'>{question}</p>
          <Link className='formSign__link'>{linkAfterBtn}</Link>
        </div>
      </div>
    </div>
  );
}
