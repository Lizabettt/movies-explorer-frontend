import './Login.css';
import FormSign from '../FormSign/FormSign';
import { useEffect } from 'react';
import useForm from '../../hooks/useForm';

export default function Login({ onLogin }) {
  const { values, setValues, handleChange } = useForm({});

  useEffect(() => {
    setValues({});
  }, [setValues]);

  console.log(values);
  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
    console.log(values);
  }
  return (
    <FormSign
      name='login'
      title='Рады видеть!'
      btnText='Войти'
      nameColor='login'
      question='Ещё не зарегистрированы?'
      linkAfterBtn='Регистрация'
      onSubmit={handleSubmit}
      onChange={handleChange}
      valuesEmail={values.email || ''}
      valuesPassword={values.password || ''}
    ></FormSign>
  );
}
