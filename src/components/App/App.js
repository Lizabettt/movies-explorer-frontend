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

export default function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [movies, setMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailUserHeader, setEmailUserHeader] = useState('');
  const [isClickBurger, setClickBurger] = useState(false);
  const navigate = useNavigate();
  const [luckRegister, setLuckRegister] = useState(false);

  const mainApi = new MainApi({
    url: 'localhost:3000', //сюда бэк
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
  const movieApi = new MovieApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const auth = new Auth({
    url: 'http://localhost:3000',
    headers: {
      "Content-Type": "application/json",
    },
  });
  //грузим фильмы и инфо пользователя с сервера
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserData(), mainApi.getAllMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setMovies(movies);
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
          setEmailUserHeader(res.email);
          navigate('/');
        }
      })
      .catch((err) => {
        setLuckRegister(false);
        // setInfoTooltipPopupOpen(true);
        console.log(err);
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
          //setInfoTooltipPopupOpen(true);
        }
      })
      .catch((err) => {
        setLuckRegister(false);
        //  setInfoTooltipPopupOpen(true);
        console.log(err);
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
          <Route path='/signin' element={<Login onLogin={handleLogin} />} />
          <Route
            path='/signup'
            element={<Register onRegister={handleRegister} />}
          />

          <Route path='*' element={<NotFound />} />
          <Route
          path='/movies'
          element={
          <ProtectedRouteElement            
            loggedIn={loggedIn}
            element={<Movies />}
          />}/>
           <Route
          path='/saved-movies'
          element={
          <ProtectedRouteElement            
            loggedIn={loggedIn}
            element={<SavedMovies />}
          />}/>
            <Route
          path='/profile'
          element={
          <ProtectedRouteElement            
            loggedIn={loggedIn}
            element={<Profile />}
          />}/>
          
        </Routes>
      </main>
      <Footer />
      <Burger isOpen={isClickBurger} onClose={handleCloseBurger} />
    </CurrentUserContext.Provider>
  );
}
