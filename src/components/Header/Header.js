import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ onSignOut, onLogin, authForm, isClose,headerClassName }) {
  const [isBurgerMenu, setIsBurgerMenu] = React.useState(false);

  const handleBurgerMenu = () => {
    setIsBurgerMenu(!isBurgerMenu);
  };

  return (
    <header className={!isBurgerMenu ? 'header' : 'header header_type_mobile'}>
      <div className={!isBurgerMenu ?'header__layout' : 'header__layout header__layout_type_mobile'}>
      <div className={!isBurgerMenu ?'header__overlay' : 'header__overlay header__overlay_type_visible'}></div>
      <div className={!isBurgerMenu ?'header__line' : 'header__line header__line_type_visible'}></div>
              <h2 className='header__title'>NewsExplorer</h2>
              <Switch>
            <Route exact path='/'>
              <button className={!isBurgerMenu ? 'header__button_burger-menu' : 'header__button_menu-close'} onClick={handleBurgerMenu}></button>
            </Route>
            <Route path='/saved-news'>
              <button className={!isBurgerMenu ? 'header__menu-saved' : 'header__menu header__menu-close'} onClick={handleBurgerMenu}></button>
            </Route>
          </Switch>
          <div className={!isBurgerMenu ? 'header__container' : 'header__container header__container_type_visible'}>
          
          <Navigation />
          {onLogin
            ? (
              <Switch>
                < Route exact path='/'>
                  <Link to='/' className='header__button' onClick={onSignOut}>Грета</Link>
                </Route>
                < Route exact path='/saved-news'>
                  <Link to='/' className='header__button header__button_saved-header' onClick={onSignOut}>Грета</Link>
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