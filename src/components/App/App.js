import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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

export default function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [movies, setMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailUserHeader, setEmailUserHeader] = useState('');
  const [isClickBurger, setClickBurger] = useState(false);
  const navigate = useNavigate();
  const [luckRegister, setLuckRegister] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
const [isShortMovie, setShortMovie] = useState(false);
const [search, setSearch] = useState('');
const [isRequestCompleted, setRequestCompleted] = useState(false);
const [serverError, setServerError] = useState({});


  const mainApi = new MainApi({
    url: BACKEND_URL, //сюда бэк
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
    //и сюда бэк
    url: BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //грузим фильмы и инфо пользователя с сервера
  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        mainApi.getUserData(),
        mainApi.getSavedMovies(),
        movieApi.getAllMovies(),
      ])
        .then(([user, savedMovies, movies]) => {
          setCurrentUser(user);
          // сохраненные фильмы
         // setSavedMovies(savedMovies)
          localStorage.setItem('savedArrayMovies', JSON.stringify(savedMovies));
          const savedArrayMovies = JSON.parse(localStorage.getItem('savedArrayMovies'));
          setSavedMovies(savedArrayMovies);
          
          //все фильмы
          localStorage.setItem('allMovies', JSON.stringify(movies));
          const allMovies = JSON.parse(localStorage.getItem('allMovies'));
          setMovies(allMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);
  
  //авторизация
  function handleLogin(dataLog) {
    auth
      .login(dataLog.email, dataLog.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          //setEmailUserHeader(res.email);
          navigate('/movies');
        }
      })
      .catch((err) => {
        setLuckRegister(false);
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
          console.log('reg');
          navigate('/signin');
          setLuckRegister(true);
        }
      })
      .catch((err) => {
        setLuckRegister(false);
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
            setEmailUserHeader(res.email);
            navigate('/');
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
  }, [loggedIn]); //  loggedIn

  //выход
  function handleExit() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');

    navigate('/signin');
  }

  //сохрани фильм
  function handleMoviesSave(movie, isLiked, id) {
  
     if (!isLiked) {
      mainApi
        .savedMoviesLike(movie)
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie]);
          console.log(newMovie);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      
      handleMoviesDelete(id);
    }
  }

  // удалить фильм
  function handleMoviesDelete(movie) {
    if (typeof movie === 'object') {
      movie = movie._id;
  }
       mainApi
      .deleteMovie(movie)
      .then(() => {
        console.log(movie);
        const newSavedMovies = savedMovies.filter(
          (updateMovie) => movie !== movie._id
        );
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  // короткометражка? если да, то отфилтьтруй
  function handleToggleAndshowShortMovie(movies) {
    // if (!isShortMovie) {
    //   setShortMovie(true);
    //   localStorage.setItem('shortMovieCheckbox', JSON.stringify(true));
    //   setMovies(movies);
    //   setSavedMovies(movies);
    // } else {
    //   setShortMovie(false);
    //   localStorage.setItem('shortMovieCheckbox', JSON.stringify(false));
    //   const filterShotMovies = movies.filter((movie) => movie.duration < 40);
    //   setMovies(filterShotMovies);
    //   setSavedMovies(movies);
    // }
  }
  //
  
  //поиск
  function handleSearchMovies(e, searchEverywhere) {
    // e.preventDefault();
    // localStorage.setItem('search', search);
    // setSearch(searchEverywhere);
    // JSON.parse(localStorage.allMovies).filter(
    //   (movie) =>
    //     movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
    //     movie.nameEN.toLowerCase().includes(search.toLowerCase())
    // );
  }
  // поиск в saved-movies
  function handleSearchSavedMovies(e) {
    // e.preventDefault();

    // const searchedMovie = savedMovies.filter(
    //   (movie) =>
    //     movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
    //     movie.nameEN.toLowerCase().includes(search.toLowerCase())
    // );
    // handleToggleAndshowShortMovie(searchedMovie);
    // setSearch('');
  }

  //меняем инфо пользователя
  function handleUpdateUser(data) {
    mainApi
      .changeUserData(data)
      .then((data) => {
      console.log(data)
      setCurrentUser(data);
      setRequestCompleted(true)})
      .catch((err) => {
        console.log(err);
        setServerError(err);
        setRequestCompleted(false)
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
      <Header isOpen={handleOpenBurger} />
      <main className='main'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route 
          path='/signin' 
          element={<Login 
            loggedIn={loggedIn}
          onLogin={handleLogin} 
          serverError={serverError}
          />} />
          <Route
            path='/signup'
            element={<Register 
              loggedIn={loggedIn}
              onRegister={handleRegister} 
              serverError={serverError}
              />}
          />

          <Route path='*' element={<NotFound />} />
          <Route
            path='/movies'
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                movies={movies}
                savedMovies={savedMovies}
                currentUser={currentUser}
                search={search}
                setSearch={setSearch}
                onSearchMovies={handleSearchMovies} //искать
                onMoviesLike={handleMoviesSave} //сохранить
                onMoviesDelete={handleMoviesDelete} //удалить
                onToggleAndshowShortMovie={handleToggleAndshowShortMovie} //чек бокс
                isShortMovie={isShortMovie}

                // кнопка ещё
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
                search={search}
                setSearch={setSearch}
                onSearchSavedMovies={handleSearchSavedMovies} //искать
                onMoviesDelete={handleMoviesDelete} //удалить
                onToggleAndshowShortMovie={handleToggleAndshowShortMovie} //чек бокс

                // сортировка по длинне фильма

                //кнопка ещё
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Profile}
                //currentUser={currentUser}
                onUpdateUser={handleUpdateUser}
                onClose={handleExit}
                isRequestCompleted={isRequestCompleted}
                //serverError={serverError}
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
