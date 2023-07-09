export default class MainApi {
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

  //получаем данные пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._result(res));
  }
 //получаем все фильмы с сервера
 getAllMovies() {
  return fetch(`${this._url}/movies`, {
    method: 'GET',
    headers: this._headers,
  }).then((res) => this._result(res));
}
  //отправляем новый фильм на сервер
  //данные берем из .....
  createNewMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._result(res));
  }

  //удаление фильма
  deleteMovie(idMovie) {
    return fetch(`${this._url}/movies/${idMovie}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._result(res));
  }
}
