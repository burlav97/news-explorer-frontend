import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logout from '../../images/logout.svg'

function SavedNewsHeader({ onSignOut, onLogin, authForm, isClose, headerClassName }) {
    const [isBurgerMenu, setIsBurgerMenu] = React.useState(false);

    const handleBurgerMenu = (e) => {
        if (!isBurgerMenu) {
            return setIsBurgerMenu(true);
        }
        setIsBurgerMenu(false);
        isClose(e);
    };

    return (
        <header className={!isBurgerMenu ? 'header header_saved' : 'header'}>
            <div className='header__layout'>
                <h2 className='header__title header__title_saved-news'>NewsExplorer</h2>
                <div className='header__container'>
                    <button className={!isBurgerMenu ? 'header__menu-black' : 'header__menu header__menu-close'} onClick={handleBurgerMenu}></button>
                    <Navigation />
                    <Link to='/' className='header__button header__button_saved-news' onClick={onSignOut}>Грета<img src={logout} className='header__icon' alt='logout icon'></img></Link>
                </div>
            </div>
        </header>
    );
}
export default SavedNewsHeader;