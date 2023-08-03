class Auth {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  //проверка на выполнение
  _result(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  //авторизация
  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => this._result(res));
  }
  cd;
  //регистрация
  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._result(res));
  }
  //токен
  getToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      //headers: this._headers,
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._result(res));
  }
}

export default Auth;
