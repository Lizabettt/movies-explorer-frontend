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

  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem('movies')) || []
  );

  const [savedMovies, setSavedMovies] = useState([]);

  const [isClickBurger, setClickBurger] = useState(false);

  const [isRequestCompleted, setRequestCompleted] = useState(false);

  const [serverError, setServerError] = useState([]);
  const [isMoviesError, setIsMoviesError] = useState(false);
  const [isBlockedInput, setIsBlockedInput] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setServerError([]);
  }, [location.pathname]);

  const mainApi = new MainApi({
    url: BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
  const movieApi = new MovieApi({
    url: BEATFILM_MOVIES_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const auth = new Auth({
    url: BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const getMoviesFromApi = () => {
    setIsLoadingMovies(true);

    movieApi
      .getAllMovies()
      .then((data) => {
        setMovies(data);
        setIsLoadingMovies(false);
        localStorage.setItem('movies', JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  };

  //грузим фильмы и инфо пользователя с сервера
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserData(), mainApi.getSavedMovies()])
        .then(([user, savedMovies]) => {
          setCurrentUser(user);
          setSavedMovies(savedMovies);
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
    //для проверки блокировки инпута
    // setTimeout(() => {
    auth
      .login(dataLog.email, dataLog.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setIsBlockedInput(true);
          navigate('/movies');
          setServerError([]);
        }
      })

      .catch((err) => {
        console.log(err);
        setServerError(err);
      });
    //}, 5000)
  }

  //регистрация
  function handleRegister(dataReg) {
    //для проверки блокировки инпута
    // setTimeout(() => {
    auth
      .register(dataReg.name, dataReg.email, dataReg.password)
      .then((data) => {
        if (data) {
          console.log(data);
          handleLogin(dataReg);
          setIsBlockedInput(true);
          setServerError([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
      });
    //}, 5000)
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
    localStorage.clear();
    navigate('/');
    setLoggedIn(false);
    setIsBlockedInput(false);
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
    //для проверки блокировки инпута
    // setTimeout(() => {
    mainApi
      .changeUserData(data)
      .then((data) => {
        setCurrentUser(data);
        setRequestCompleted(true);
        setIsBlockedInput(true);
      })
      .catch((err) => {
        console.log(err);
        setServerError(err);
        setRequestCompleted(false);
      });
    //}, 5000)
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

      <main className='main'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/signin'
            element={
              <Login
                loggedIn={loggedIn}
                onLogin={handleLogin}
                apiErrorMessage={serverError}
                isBlockedInput={isBlockedInput}
                setIsBlockedInput={setIsBlockedInput}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                loggedIn={loggedIn}
                onRegister={handleRegister}
                apiErrorMessage={serverError}
                isBlockedInput={isBlockedInput}
              />
            }
          />
          <Route path='*' element={<NotFound loggedIn={loggedIn} />} />
          <Route
            path='/movies'
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                getMovies={getMoviesFromApi}
                movies={movies}
                savedMovies={savedMovies}
                moviesError={isMoviesError}
                onMoviesLike={handleMoviesSave}
                onMoviesDelete={handleMoviesDelete}
                isLoadingMovies={isLoadingMovies}
              />
            }
          />
          <Route
            path='/saved-movies'
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
            path='/profile'
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Profile}
                onUpdateUser={handleUpdateUser}
                onClose={handleExit}
                isRequestCompleted={isRequestCompleted}
                isBlockedInput={isBlockedInput}
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
