import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRoute';

import MainApi from '../../utils/MainApi';
import MovieApi from '../../utils/MovieApi';
import Auth from '../../utils/auth';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Burger from '../Burger/Burger';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import { BEATFILM_MOVIES_URL } from '../../utils/consts';
import { BACKEND_URL } from '../../utils/consts';
import { useLocation } from 'react-router-dom';

export default function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isClickBurger, setClickBurger] = useState(false);
  const navigate = useNavigate();

  const [isRequestCompleted, setRequestCompleted] = useState(false);

  const [serverError, setServerError] = useState([]);
  const [isMoviesError, setIsMoviesError] = useState(false);

  const location = useLocation();

  const mainApi = new MainApi({
    url: BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  });
  const movieApi = new MovieApi({
    url: BEATFILM_MOVIES_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const auth = new Auth({
    url: BACKEND_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  //грузим фильмы и инфо пользователя с сервера
  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        mainApi.getUserData(),
        mainApi.getSavedMovies(),
        movieApi.getAllMovies()
      ])
        .then(([user, savedMovies, movies]) => {
          setCurrentUser(user);
          setSavedMovies(savedMovies);
          setMovies(movies);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

          setIsMoviesError(false);
        })
        .catch((err) => {
          console.log(err);
          setIsMoviesError(true);
        });
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  //авторизация
  function handleLogin(dataLog) {
    auth
      .login(dataLog.email, dataLog.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/movies');
          setServerError([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
      });
  }

  //регистрация
  function handleRegister(dataReg) {
    auth
      .register(dataReg.name, dataReg.email, dataReg.password)
      .then((data) => {
        if (data) {
          console.log(data);
          handleLogin(dataReg);
          setServerError([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
      });
  }

  //сверим токен и авторизацию
  function handleToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(location.pathname);
            console.log('token');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  // eslint-disable-next-line
  useEffect(() => {
    handleToken();
    // eslint-disable-next-line
  }, []);

  //выход
  function handleExit() {
    setLoggedIn(false);
    localStorage.clear();

    navigate('/signin');
  }

  useEffect(() => {
    loggedIn &&
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, loggedIn]);

  //сохрани фильм
  function handleMoviesSave(movie, isLiked, id) {
    if (!isLiked) {
      mainApi
        .savedMoviesLike(movie)
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      handleMoviesDelete(id);
    }
  }

  // удалить фильм
  function handleMoviesDelete(id) {
    const searchedSavedMovies = JSON.parse(
      localStorage.getItem('searchedSavedMovies')
    );

    mainApi
      .deleteMovie(id)
      .then(() => {
        const newSavedMovies = savedMovies.filter((movie) => id !== movie._id);
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));

        if (searchedSavedMovies) {
          const updatedSearchedSavedMovies = searchedSavedMovies.filter(
            (movie) => movie._id !== id
          );

          localStorage.setItem(
            'searchedSavedMovies',
            JSON.stringify(updatedSearchedSavedMovies)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //меняем инфо пользователя
  function handleUpdateUser(data) {
    mainApi
      .changeUserData(data)
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
        setRequestCompleted(true);
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
        setRequestCompleted(false);
      });
  }
  // открыть бургер
  function handleOpenBurger() {
    setClickBurger(true);
  }
  // закрыть бургер
  function handleCloseBurger() {
    setClickBurger(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isOpen={handleOpenBurger} loggedIn={loggedIn} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signin"
            element={
              <Login
                loggedIn={loggedIn}
                onLogin={handleLogin}
                apiErrorMessage={serverError}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                loggedIn={loggedIn}
                onRegister={handleRegister}
                apiErrorMessage={serverError}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                movies={movies}
                savedMovies={savedMovies}
                moviesError={isMoviesError}
                onMoviesLike={handleMoviesSave}
                onMoviesDelete={handleMoviesDelete}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={SavedMovies}
                movies={savedMovies}
                savedMovies={savedMovies}
                currentUser={currentUser}
                onMoviesDelete={handleMoviesDelete}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Profile}
                onUpdateUser={handleUpdateUser}
                onClose={handleExit}
                isRequestCompleted={isRequestCompleted}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
      <Burger isOpen={isClickBurger} onClose={handleCloseBurger} />
    </CurrentUserContext.Provider>
  );
}
