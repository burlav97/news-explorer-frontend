import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SearchForm from '../SearchForm/SearchForm.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import SavedNews from '../SavedNews/SavedNews';
import Preloader from '../Preloader/Preloader';
import Login from '../Login/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Register from '../Register/Register';
import arrayCards from '../../utils/cards';


function App({ isBurgerMenu }) {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isSuccessRegisterOpen, setIsSuccessRegisterOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleAuthorizationOpen() {
    setIsSuccessRegisterOpen(false);
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }

  function handleRegisterOpen() {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  }

  function handleRegister() {
    setIsRegisterOpen(false);
    setIsSuccessRegisterOpen(true);
  }

  function handleLogin() {
    setLoggedIn(true);
    setIsLoginOpen(false);
  }

  function logOut() {
    setLoggedIn(false);
  }

  function closeAllPopup(e) {
    if (e.target === e.currentTarget || e.key === 'Escape') {
      setIsLoginOpen(false);
      setIsSuccessRegisterOpen(false);
      setIsRegisterOpen(false);
    }
  }

  return (

    <div className='page' onKeyDown={closeAllPopup}>
        <Switch>
          < Route exact path="/">
            <Header
              authForm={handleAuthorizationOpen}
              headerClassName={'header'}
              loggedIn={loggedIn}
              logOut={logOut}
              onClose={closeAllPopup} />
            <SearchForm />
            <Preloader />
            <NewsCardList />
            <About />
            <Footer />
          </Route>
          <Route path="/saved-news">
            <SavedNewsHeader
              headerClassName={'header'}
              loggedIn={loggedIn}
              logOut={logOut}
              onClose={closeAllPopup}
            />
            <SavedNews cards={arrayCards} />
            <Footer />
          </Route>
        </Switch>
        <Login
          isOpen={isLoginOpen}
          onClose={closeAllPopup}
          onLogin={handleLogin}
          changeModal={handleRegisterOpen}
        />
        <Register
          isOpen={isRegisterOpen}
          onClose={closeAllPopup}
          onRegister={handleRegister}
          changeModal={handleAuthorizationOpen}
        />
        <InfoTooltip
          isOpen={isSuccessRegisterOpen}
          onClose={closeAllPopup}
          changeModal={handleAuthorizationOpen}
        />
    </div>


  );

}

export default App;