import './Login.css';
import FormSign from '../FormSign/FormSign';
import useForm from '../../hooks/useFormAndValid';
import { useEffect } from 'react';

export default function Login({ onLogin }) {
  const { values, setValues, handleChange, errors, isValid } = useForm({});

  useEffect(() => {
    setValues({});
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin(values);
    console.log(values);
  }
  return (
    <FormSign
      namePage="login"
      title="Рады видеть!"
      btnText="Войти"
      nameColor="login"
      question="Ещё не зарегистрированы?"
      link="/signup"
      linkAfterBtn="Регистрация"
      handleSubmit={handleSubmit}
      onChange={handleChange}
      isValid={isValid}
      values={values}
      errors={errors}
    ></FormSign>
  );
}
