import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import github from '../../images/github.svg';
import facebook from '../../images/facebook.svg';

function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__copyright'>&#174; 2020 Supersite, Powered by News API</p>
            <div className='footer__container'>
                <nav className='footer__nav'>
                <Link exact to='/' className='footer__link'>Главная</Link>
                <a href='https://praktikum.yandex.ru' target='_blank' className='footer__link'>Яндекс.Практикум</a>
                </nav>
                <div className='footer__social'>
                <a href='https://github.com/burlav97' target='_blank' className='footer__icon'><img className='footer_icon' src={ github } alt='github'/></a>
                <a href='https://www.facebook.com/' target='_blank' className='footer__icon'><img className='footer_icon' src={ facebook } alt='facebook'/></a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;