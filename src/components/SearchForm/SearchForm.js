import React from 'react';

function SearchForm() {
    return (
        <section className='search'>
            <div className='search__container'>
                <h1 className='search__title'>Что творится в мире?</h1>
                <p className='search__paragraph'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <form className='search__form'>
                    <input className='search__input' type='text' placeholder='Введите тему здесь'></input>
                    <button className='search__button' type='submit'>Искать</button>

                </form>
            </div>
        </section>
    );
}
export default SearchForm;