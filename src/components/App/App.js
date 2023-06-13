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

import CurrentUserContext from '../../contexts/CurrentUserContext';
// import ProtectedRouteElement from '../ProtectedRoute';

export default function App() {
  const [currentUser, setCurrentUser] = useState('');
  // const [loggedIn, setLoggedIn] = useState(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
      //onExit={handleExit}
      // email={emailUserHeader}
      />
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

      {/* <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatarUser={handleUpdateUserAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          btnText="Да"
        ></PopupWithForm>

        <ImagePopup
          name="img"
          card={isDataCards}
          isOpen={chooseCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            luckRegister={luckRegister}  />  */}
    </CurrentUserContext.Provider>
  );
}
