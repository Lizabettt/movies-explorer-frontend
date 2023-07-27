import './Profile.css';
import { Link } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import useForm from '../../hooks/useFormAndValid';

import CurrentUserContext from '../../contexts/CurrentUserContext';


export default function Profile({
  onUpdateUser,
  onClose,
  isRequestCompleted,
  serverError,
}) {
  const { values, setValues, handleChange, isValid, setValid, errors } = useForm({});
  const currentUser = useContext(CurrentUserContext);
  const [isChangedInfo, setChangedInfo] = useState(false);
  const [isRequestText, setRequestText] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
      //setValid(true);
    }
  }, [setValues, currentUser
    // , setValid
  ]);
//сабмит формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
   // setChangedInfo(false);
    setRequestText(true);
    console.log(values);
  }
  //кнопка сабмита формы
  const handleBtnClickSubmit = (evt) => {
    evt.preventDefault();
    setChangedInfo(true);
    // setRequestText(false)
  };

//если есть изминения 
  useEffect(() => {
    currentUser.name !== values.name || 
    currentUser.email !== values.email
      ? setChangedInfo(true)
      : setChangedInfo(false);
  }, [currentUser.name, currentUser.email, values.email, values.name]);

 
  //сделай кнопку сохранить или нет
  return (
    <div className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form className='profile__form' 
      onSubmit={handleSubmit}
      noValidate
      >
        <div className='profile__items-inputs'>
          <label className='profile__input-label' htmlFor='nameInput'>
            Имя
          </label>
          <input
            className={`profile__item-input profile__item-input_type_name `}
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
          />
        </div>
        <span className={`profile__input-help`}>

          {errors.name}
        </span>
        <div className='profile__items-inputs'>
          <label className='profile__input-label' htmlFor='emailInput'>
            E-mail
          </label>
          <input
            className={`profile__item-input profile__item-input_type_email `}
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
          />
        </div>
        <span className={`profile__input-help`}>

          {errors.email}
        </span>
        {isRequestCompleted ? (
          <span
            className={`profile__resultRequest ${
              isRequestText ? '' : 'profile__resultRequest-invisible'
            }`}
          >
            Отлично! Мы обновили Ваши данные!
          </span>
        ) : (
          <span
            className={`profile__resultRequest ${
              serverError ? '' : 'profile__resultRequest-invisible'
            }`}
          >
            Упс... Ошибка сервера. Попробуйте позже!
          </span>
        )}
        <div className='profile__buttons'>
          {isValid && isChangedInfo ? (
            <button
              className='profile__btn profile__btn-profileSaved'
              type='submit'
            >
              Сохранить
            </button>
          ) : (
            <>
              <button
                className='profile__btn profile__btn-profileNotSaved'
                type='button'
                onClick={handleBtnClickSubmit}
                disabled={true}
              >
                {' '}
                Редактировать
              </button>
            </>
          )}
        </div>

        <Link
          className='profile__btn profile__btn_type_exit'
          type='button'
          to={'/signin'}
          onClick={onClose}
        >
          Выйти из аккаунта
        </Link>
      </form>
    </div>
  );
}
