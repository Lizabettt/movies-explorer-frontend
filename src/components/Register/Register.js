import './Register.css';
import FormSign from '../FormSign/FormSign';
import useForm from '../../hooks/useFormAndValid';
import { useEffect } from 'react';
import { validateName } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';

export default function Register({ 
  onRegister, 
  loggedIn, 
  apiErrorMessage,
  isBlockedInput }) {

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
    onRegister(values);
    console.log(values);
  }

  return (
    <FormSign
      namePage="register"
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
      nameColor="login"
      question="Уже зарегистрированы?"
      link="/signin"
      linkAfterBtn="Войти"
      handleSubmit={handleSubmit}
      onChange={handleChange}
      isValid={isValid}
      values={values}
      errors={errors}
      apiErrorMessage={apiErrorMessage}
      disabled={isBlockedInput}
    >
      <div className="formSign__items-inputs">
        <label className="formSign__input-label" htmlFor="nameInput">
          Имя
        </label>
        <input
          className="formSign__item-input"
          id="nameInput"
          type="text"
          placeholder="Имя пользователя"
          name="name"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
          value={values.name || ''}
          onChange={handleChange}
          disabled={isBlockedInput}
        />
        <span className="formSign__input-help inputName-err">
          {validateName(values.name).message}
        </span>
      </div>
    </FormSign>
  );
}
