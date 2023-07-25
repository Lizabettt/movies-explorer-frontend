import './Profile.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  useForm  from '../../hooks/useFormAndValid';
import { USER_NAME, USER_EMAIL } from '../../utils/consts';

export default function Profile({ currentUser, onUpdateUser, onClose }) {
  const { 
    values, 
    setValues,
    handleChange,
    isValid, 
    setValid } = useForm({});
    
    const [isNewValues, setNewValues] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
      setValid(true);
    }
  }, [setValues, setValid, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }
  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setNewValues(true);
    } else {
      setNewValues(false);
    }
  }, [values]);

  //сделай кнопку сохранить или нет
  return (
    <div className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form className='profile__form' onSubmit={handleSubmit}>
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
            value={values.name || ''}
            onChange={handleChange}
            pattern={USER_NAME}
          />
        </div>
        <span className='profile__input-help inputName-err'>
          {/* {errors.name} */}
          </span>
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
            value={values.email || ''}
            onChange={handleChange}
            pattern={USER_EMAIL}
          />
        </div>
        <span className='profile__input-help inputEmail-err'>
          {/* {errors.email} */}
          </span>
        <button className='profile__btn btn'
        type="submit"
        >Редактировать</button>
        <Link
          className='profile__btn profile__btn_type_exit btn'
          to={'/signin'}
          onClick={onClose}
        >
          Выйти из аккаунта
        </Link>
      </form>
    </div>
  );
}
