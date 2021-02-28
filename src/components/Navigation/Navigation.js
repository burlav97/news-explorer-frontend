import React from 'react';
import { NavLink, Route, Switch, Link} from 'react-router-dom';
import './Navigation.css';


function Navigation({ loggedIn }) {
    return (
        <nav className='navigation'>
            <Switch>
                < Route exact path='/'>
                    {loggedIn
                        ? (
                            <>
                                <NavLink to='/' activeClassName='navigation__link_active' className='navigation__link'>Главная</NavLink>
                                <NavLink to='/saved-news' activeClassName='navigation__link_active' className='navigation__link'>Сохраненные статьи</NavLink>
                            </>)
                        : (<NavLink to='/' activeClassName='navigation__link_active' className='navigation__link'>Главная</NavLink>)}

                </Route>
                <Route path='/saved-news'>
                    <Link to='/' className='navigation__link_saved-news'>Главная</Link>
                    <NavLink to='/saved-news' activeClassName='navigation__link_active-saved-news' className='navigation__link_saved-news'>Сохраненные статьи</NavLink>
                </Route>
            </Switch>

        </nav>


    );
}

export default Navigation;