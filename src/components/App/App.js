import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Header from '../Header/Header.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SearchForm from '../SearchForm/SearchForm.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import SavedNews from '../SavedNews/SavedNews';
import Preloader from '../Preloader/Preloader';
import NotFoundResult from '../NotFounResult/NotFoundResult';
import Login from '../Login/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Register from '../Register/Register';
import * as mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../utils/CurrentUserContext';
import { getNews } from '../../utils/NewsApi';


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [articles, setArticles] = React.useState([]);
  const [saveArticles, setSaveArticles] = React.useState([]);

  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isSuccessRegisterOpen, setIsSuccessRegisterOpen] = React.useState(false);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [showResultNotFound, setResultNotFound] = React.useState(false);
  const [showNewsCardList, setShowNewsCardList] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const routerState = history.location.state;
    if (!localStorage.getItem('jwt') && routerState && routerState.noAuthRedirected && history.action === "REPLACE") {
      setIsLoginOpen(true);
    };
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    };

    if (jwt) {
      Promise.all([mainApi.getContent(jwt), mainApi.getArticles(jwt)])
        .then(([info, data]) => {
          setCurrentUser(info);
          setSaveArticles(data);
          setLoggedIn(true);

          if (JSON.parse(localStorage.getItem('allArticles')) !== null) {
            const arrArticles = JSON.parse(localStorage.getItem('allArticles'));
            const savedLinks = saveArticles.map(({ link }) => link);
            const saved = arrArticles.map((card) => {
              const isSaved = savedLinks.includes(card.url);
              return isSaved;
            });
            for (let i = 0; i < arrArticles.length; i++) {
              arrArticles[i].isSaved = saved[i];
            };
            setArticles(arrArticles);
            setShowNewsCardList(true);
          };
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);

  function openLoginPopup() {
    setIsSuccessRegisterOpen(false);
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }

  function openRegisterPopup() {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  }

  function closeAllPopup(e) {
    if (e.target === e.currentTarget || e.key === 'Escape') {
      setIsLoginOpen(false);
      setIsSuccessRegisterOpen(false);
      setIsRegisterOpen(false);
    }
  }

  function handleRegister(email, password, name) {
    mainApi.register(email, password, name)
      .then((data) => {
        if (data) {
          setCurrentUser(data);
        }
        setIsRegisterOpen(false);
        setIsSuccessRegisterOpen(true);
      })
      .catch((err) => {
        console.error(err);
        setMessage(err);
      });
  }

  function handleLogin(email, password) {
    mainApi.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setIsLoginOpen(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage(err);
      });
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  }

  function handleSearchNews(searchValue) {
    setResultNotFound(false);
    setShowNewsCardList(false);
    setShowPreloader(true);
    getNews(searchValue)
      .then((res) => {
        if (res.articles.length === 0) {
          setResultNotFound(true);
        } else {
          setResultNotFound(false);
          const arrArticles = res.articles;
          const savedLinks = saveArticles.map(({ link }) => link);
          const saved = arrArticles.map((card) => {
            const isSaved = savedLinks.includes(card.url);
            return isSaved;
          });
          for (let i = 0; i < arrArticles.length; i++) {
            arrArticles[i].isSaved = saved[i];
            arrArticles[i].keyword = searchValue;
          };

          localStorage.setItem('allArticles', JSON.stringify(arrArticles));
          setArticles(arrArticles);
          setShowNewsCardList(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setResultNotFound(true);
        setShowPreloader(false);
      })
      .finally(() => {
        setShowPreloader(false)
      });
  }

  function handleSaveArticle(article) {
    mainApi.saveArticle(article)
      .then((art) => {
        setSaveArticles([...saveArticles, art]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleDeleteArticle(article) {
    mainApi.deleteArticle(article._id)
      .then(() => {
        const newArrArticles = saveArticles.filter(i => i._id !== article._id);
        setSaveArticles(newArrArticles);
      })
      .catch((err) => {
        console.error(err);
      });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    
        <div className='page' onKeyDown={closeAllPopup}>
          <Switch>
            < Route exact path='/'>
              <Header
                authForm={openLoginPopup}
                headerClassName={'header'}
                loggedIn={loggedIn}
                onSignOut={onSignOut}
                onClose={closeAllPopup} />
              <SearchForm
                handleSearchNews={handleSearchNews}
              />
              {showPreloader && <Preloader />}
              {showResultNotFound && <NotFoundResult />}
              {showNewsCardList &&
                <NewsCardList 
                articles={articles}
                onSaveArticle={handleSaveArticle}
                setIsRegisterOpen={setIsRegisterOpen}/>
              }
              <About />
              <Footer />
            </Route>
            <ProtectedRoute path='/saved-news' loggedIn={loggedIn}>
              <SavedNewsHeader
                headerClassName={'header'}
                loggedIn={loggedIn}
                onSignOut={onSignOut}
                onClose={closeAllPopup}
              />
              <SavedNews saveArticles={saveArticles}
              onDeleteArticle={handleDeleteArticle} />
              <Footer />
            </ProtectedRoute>
            <Route path=''>
              <Redirect to={{ pathname: '/', state: { noAuthRedirected: true } }} />
            </Route>
          </Switch>
          <Login
            isOpen={isLoginOpen}
            onClose={closeAllPopup}
            onLogin={handleLogin}
            changeModal={openRegisterPopup}
            message={message}
          />
          <Register
            isOpen={isRegisterOpen}
            onClose={closeAllPopup}
            onRegister={handleRegister}
            changeModal={openLoginPopup}
            message={message}
          />
          <InfoTooltip
            isOpen={isSuccessRegisterOpen}
            onClose={closeAllPopup}
            changeModal={openLoginPopup}
          />
        </div>

    </CurrentUserContext.Provider>
  );

}

export default App;