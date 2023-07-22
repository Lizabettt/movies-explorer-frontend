export default class MovieApi {
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

  //получаем все фильмы с сервера
  getAllMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._result(res));
  }
}
