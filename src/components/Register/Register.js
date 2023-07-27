import './Register.css';
import FormSign from '../FormSign/FormSign';
import  useForm  from '../../hooks/useFormAndValid';
import { useEffect } from 'react';

export default function Register({ onRegister}) {

  const { values, setValues, handleChange, errors, isValid} = useForm({});

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
      namePage='register'
      title='Добро пожаловать!'
      btnText='Зарегистрироваться'
      nameColor='login'
      question='Уже зарегистрированы?'
      link="/signin"
      linkAfterBtn='Войти'
      handleSubmit={handleSubmit}
       onChange={handleChange}
   
      isValid={isValid}
      values={values}
      errors={errors}
        
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
        <span className='formSign__input-help inputName-err'>{errors.password}</span>
      </div>
      
    </FormSign>
  );
}
