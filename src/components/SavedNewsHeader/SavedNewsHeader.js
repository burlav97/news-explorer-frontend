import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logout from '../../images/logout.svg';
import CurrentUserContext from '../../utils/CurrentUserContext.js';


function SavedNewsHeader({ onSignOut, isClose }) {
    const [isBurgerMenu, setIsBurgerMenu] = React.useState(false);

    const handleBurgerMenu = () => {
        setIsBurgerMenu(!isBurgerMenu);
    };

    const currentUser = React.useContext(CurrentUserContext);
    const userName = currentUser.name;

    
    return (
        <header className={!isBurgerMenu ? 'header header_saved' : 'header'}>
            <div className={!isBurgerMenu ? 'header__layout' : 'header__layout header__layout_type_mobile-saved'}>
                <div className={!isBurgerMenu ? 'header__overlay' : 'header__overlay header__overlay_type_visible'}></div>
                <div className={!isBurgerMenu ? 'header__line' : 'header__line header__line_type_visible-saved'}></div>
                <h2 className='header__title header__title_saved-news'>NewsExplorer</h2>
                <button className={!isBurgerMenu ? 'header__burger header__burger_menu-saved' : 'header__burger header__burger_saved-close'} onClick={handleBurgerMenu}></button>
                <div className={!isBurgerMenu ? 'header__container' : 'header__container header__container_type_visible-saved'}>

                    <Navigation />
                    <Link to='/' className='header__button header__button_saved-news' onClick={onSignOut}>{userName}<img src={logout} className='header__icon' alt='logout icon' /></Link>
                </div>
            </div>
        </header>
    );
}
export default SavedNewsHeader;