import './FormSign.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/validation';

export default function FormSign({
  namePage,
  title,
  children,
  btnText,
  question,
  link,
  linkAfterBtn,
  onChange,
  isValid,
  handleSubmit,
  values,
  errors,
  apiErrorMessage,
  disabled
}) {
  const btnSubmitClassName = isValid
    ? 'formSign__btn'
    : 'formSign__btn formSign__btn_disabled';

  return (
    <div className="formSign">
      <div className="formSign-box">
        <Logo />
        <h2 className="formSign__title"> {title} </h2>
        <form
          className="formSign__form"
          action="formSign__form"
          name="formSign__name"
          method="post"
          noValidate
          onSubmit={handleSubmit}
               >
          {children}

          <div className="formSign__items-inputs">
            <label className="formSign__input-label" htmlFor="emailInput">
              E-mail
            </label>
            <input
              className="formSign__item-input"
              id="emailInput"
              type="email"
              placeholder="Введите e-mail"
              name="email"
              minLength="2"
              maxLength="40"
              required
              autoComplete="off"
              values={values.email || ''}
              onChange={onChange}
              disabled={disabled}
            />
            <span className="formSign__input-help inputEmail-err">
              {validateEmail(values.email).message}
            </span>
          </div>

          <div className="formSign__items-inputs">
            <label className="formSign__input-label" htmlFor="passwordInput">
              Пароль
            </label>
            <input
              className="formSign__item-input"
              id="passwordInput"
              type="password"
              placeholder="Введите пароль"
              name="password"
              minLength="2"
              maxLength="40"
              required
              autoComplete="off"
              values={values.password || ''}
              onChange={onChange}
              disabled={disabled}
            />
            <span className="formSign__input-help inputPassword-err">
              {errors.password}
            </span>
          </div>
          <div className={`formSign-btn-box formSign-btn-box_type-${namePage}`}>
            <button
              className={btnSubmitClassName}
              type="submit"
              disabled={validateEmail(values.email).invalid}
            >
              {btnText}
            </button>
            <span className="formSign__apiErrorMessage">
              {apiErrorMessage?.status === 409
                ? 'Пользователь с такими данными уже зарегистрирован'
                : ''}

              {apiErrorMessage?.status === 401
                ? 'Неверные почта или пароль'
                : ''}
            </span>
          </div>
        </form>

        <div className="formSign-afterBtn-box">
          <p className="formSign__question">{question}</p>
          <Link className="formSign__link" to={link}>
            {linkAfterBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}
