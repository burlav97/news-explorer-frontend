import React from 'react';
import './Preloader.css';

function Preloader() {
    return (
        <section className='preloader'>
            <i className='preloader__circle'></i>
            <h5 className='preloader__title'>Идет поиск новостей...</h5>            
        </section>
    );
}

export default Preloader;