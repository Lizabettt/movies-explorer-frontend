import { BEATFILM_URL } from '../utils/consts';
export default class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  //проверка на выполнение
  _result(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      return Promise.reject({
        status: res.status,
        errorText:
          JSON.parse(text).message === 'Validation failed'
            ? JSON.parse(text).validation.body.message
            : JSON.parse(text).message
      });
    });
  }

  //получаем данные пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._result(res));
  }

  //получаем все сохраненны фильмы с сервера
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._result(res));
  }

  //отправляем новый фильм на сервер
  // при нажатии на лайк
  savedMoviesLike(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        trailerLink: data.trailerLink,
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: BEATFILM_URL + data.image.url,
        thumbnail: BEATFILM_URL + data.image.formats.thumbnail.url,
        movieId: data.id,
        owner: data.user
      })
    }).then((res) => this._result(res));
  }

  //удаление фильма
  deleteMovie(idMovie) {
    return fetch(`${this._url}/movies/${idMovie}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => this._result(res));
  }

  //меняем info пользователя
  changeUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    }).then((res) => this._result(res));
  }
}
