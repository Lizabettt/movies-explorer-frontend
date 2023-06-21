import './Register.css';
import FormSign from '../FormSign/FormSign';

export default function Register() {
  return (
    <FormSign
      name='register'
      title='Добро пожаловать!'
      btnText='Зарегистрироваться'
      nameColor='login'
      question='Уже зарегистрированы?'
      linkAfterBtn='Войти'
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
        />
      </div>
      <span className='formSign__input-help inputName-err'></span>
    </FormSign>
  );
}
