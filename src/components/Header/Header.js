import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import CurrentUserContext from '../../utils/CurrentUserContext.js';

function Header({ onSignOut, loggedIn, authForm, openLoginPopup }) {
  const [isBurgerMenu, setIsBurgerMenu] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const handleBurgerMenu = () => {
    setIsBurgerMenu(!isBurgerMenu);
  };

  return (
    <header className={!isBurgerMenu ? 'header' : 'header header_type_mobile'}>
      <div className={!isBurgerMenu ?'header__layout' : 'header__layout header__layout_type_mobile'}>
      <div className={!isBurgerMenu ?'header__overlay' : 'header__overlay header__overlay_type_visible'}></div>
      <div className={!isBurgerMenu ?'header__line' : 'header__line header__line_type_visible'}></div>
              <h2 className='header__title'>NewsExplorer</h2>
          
              <button className={!isBurgerMenu ? 'header__burger header__burger_menu' : 'header__burger header__burger_close'} onClick={handleBurgerMenu}></button>
            
          <div className={!isBurgerMenu ? 'header__container' : 'header__container header__container_type_visible'}>
          
          <Navigation 
          authForm={openLoginPopup}
          loggedIn={loggedIn}
          onSignOut={onSignOut}
          />
          {loggedIn
            ? (
              <Switch>
                < Route exact path='/'>
                  <Link to='/' className='header__button' onClick={onSignOut}>{currentUser.name}</Link>
                </Route>
                < Route exact path='/saved-news'>
                  <Link to='/' className='header__button header__button_saved-header' onClick={onSignOut}>{currentUser.name}</Link>
                </Route>
              </Switch>
            )
            : (
              <button className='header__button' onClick={authForm}>Авторизоваться</button>
            )}


        </div>
        </div>
    </header>
  );
}
export default Header;