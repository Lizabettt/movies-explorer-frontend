import './Profile.css';
import { Link } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { validateEmail, validateName } from '../../utils/validation';
import useForm from '../../hooks/useFormAndValid';

import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function Profile({
  onUpdateUser,
  onClose,
  isRequestCompleted,
  serverError,
  isBlockedInput,
}) {
  const { values, setValues, handleChange, isValid } = useForm({});

  const currentUser = useContext(CurrentUserContext);
  const [isChangedInfo, setChangedInfo] = useState(false);
  const [isRequestText, setRequestText] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    }
  }, [setValues, currentUser]);

  //сабмит формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
    setRequestText(true);
    console.log(values);
  }

  //кнопка сабмита формы
  const handleBtnClickSubmit = (evt) => {
    evt.preventDefault();
    setChangedInfo(true);
  };

  //если есть изминения
  useEffect(() => {
    currentUser.name !== values.name || currentUser.email !== values.email
      ? setChangedInfo(true)
      : setChangedInfo(false);
  }, [currentUser.name, currentUser.email, values.email, values.name]);

  return (
    <div className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form className='profile__form' onSubmit={handleSubmit} noValidate>
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
            disabled={isBlockedInput}
          />
        </div>
        <span className={`profile__input-help`}>
          {validateName(values.name).message}
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
            disabled={isBlockedInput}
          />
        </div>
        <span className={`profile__input-help`}>
          {validateEmail(values.email).message}
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
          {isChangedInfo ? (
            <button
              className='profile__btn profile__btn-profileSaved'
              type='submit'
              disabled={
                !isValid ||
                validateEmail(values.email).invalid ||
                validateName(values.name).invalid
              }
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
          to={'/'}
          onClick={onClose}
        >
          Выйти из аккаунта
        </Link>
      </form>
    </div>
  );
}
