import './Login.css';
import FormSign from '../FormSign/FormSign';
import useForm from '../../hooks/useFormAndValid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({
  onLogin,
  loggedIn,
  apiErrorMessage,
  isBlockedInput,
}) {
  const { values, setValues, handleChange, errors, isValid } = useForm({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, [loggedIn]);

  useEffect(() => {
    setValues({});
  }, [setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }
  return (
    <FormSign
      namePage='login'
      title='Рады видеть!'
      btnText='Войти'
      nameColor='login'
      question='Ещё не зарегистрированы?'
      link='/signup'
      linkAfterBtn='Регистрация'
      handleSubmit={handleSubmit}
      onChange={handleChange}
      isValid={isValid}
      values={values}
      errors={errors}
      apiErrorMessage={apiErrorMessage}
      disabled={isBlockedInput}
    ></FormSign>
  );
}
