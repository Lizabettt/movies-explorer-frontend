import './Login.css';
import FormSign from '../FormSign/FormSign';

export default function Login() {
    return (
      <FormSign
      name='login'
      title='Рады видеть!'
      btnText='Войти'   
      nameColor="login"
      question="Ещё не зарегистрированы?"
      linkAfterBtn="Регистрация"
      >

      </FormSign>
    );
  }