import './Register.css';
import FormSign from '../FormSign/FormSign';
import useForm from '../../hooks/useForm';
import { useEffect } from 'react';

export default function Register({ onRegister }) {

  const { values, setValues, handleChange} = useForm({});

  useEffect(() => {
    setValues({});
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
    console.log(values);
  }

  return (
    <FormSign
      name='register'
      title='Добро пожаловать!'
      btnText='Зарегистрироваться'
      nameColor='login'
      question='Уже зарегистрированы?'
      linkAfterBtn='Войти'
      onSubmit={handleSubmit}
      onChange={handleChange}
     // valuesName={values.name || ''}
      valuesEmail={values.email || ''}
        valuesPassword={values.password || ''}
    >
      <div className='formSign__items-inputs'>
        <label className='formSign__input-label' htmlFor='nameInput'>
          Имя
        </label>
        <input
          className='formSign__item-input'
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
      <span className='formSign__input-help inputName-err'></span>
    </FormSign>
  );
}
