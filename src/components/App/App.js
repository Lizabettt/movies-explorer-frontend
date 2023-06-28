import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
// import ProtectedRouteElement from '../ProtectedRoute';

export default function App() {
  const [currentUser, setCurrentUser] = useState('');
  // const [loggedIn, setLoggedIn] = useState(false);
  const [isClickBurger, setClickBurger] = useState(false);

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
            element={
              <Login />
              // onLogin={handleLogin}
            }
          />
          <Route
            path='/signup'
            element={
              <Register
              // onRegister={handleRegister}
              />
            }
          />

          <Route path='*' element={<NotFound />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <Burger isOpen={isClickBurger} onClose={handleCloseBurger} />
    </CurrentUserContext.Provider>
  );
}
