import './Login.css';
import FormSign from '../FormSign/FormSign';

export default function Login() {
    return (
      <FormSign
      name='login'
      title='login'
      btnText='Войти'   
      nameColor="login"
      textAfterBtn="Ещё не зарегистрированы?"
      linkAfterBtn="Регистрация"
      >

      </FormSign>
    );
  }