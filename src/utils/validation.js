import { USER_NAME, USER_EMAIL } from '../utils/consts';

export function validateName(name) {
  if (name !== undefined) {
    if (name.length === 0) {
      return { invalid: true, message: 'Пожалуйста, заполните это поле!' };
    } else if (!USER_NAME.test(name.toLowerCase())) {
      return {
        invalid: true,
        message:
          'Имя пользователя может состоять из букв кириллицы или латиницы, дефиса и пробела!',
      };
    } else if (USER_NAME.test(name.toLowerCase())) {
      return { invalid: false, message: '' };
    }
  } else {
    return { invalid: true, message: '' };
  }
}

export function validateEmail(email) {
  if (email !== undefined) {
    if (email.length === 0) {
      return { invalid: true, message: 'Поле не заполните быть пустым!' };
    } else if (!USER_EMAIL.test(email.toLowerCase())) {
      return { invalid: true, message: 'Email указан не верно!' };
    } else if (USER_EMAIL.test(email.toLowerCase())) {
      return { invalid: false, message: '' };
    }
  } else {
    return { invalid: true, message: '' };
  }
}
