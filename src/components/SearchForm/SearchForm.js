import React from 'react';

function SearchForm({ handleSearchNews }) {
    const [searchValue, setSearchValue] = React.useState('');
    const setSearchValueHandler = (evt) => {
      setSearchValue(evt.target.value);
    };
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      if(handleSearchNews) {
        handleSearchNews(searchValue);
      }
    };
  
    return (
        <section className='search'>
            <div className='search__container'>
                <h1 className='search__title'>Что творится в мире?</h1>
                <p className='search__paragraph'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <form className='search__form' method='POST' name={`searchform`} action='#'  onSubmit={handleSubmit}>
                    <input className='search__input' type='text' placeholder='Введите тему здесь'  onChange={setSearchValueHandler} required></input>
                    <button className='search__button' type='submit'>Искать</button>

                </form>
            </div>
        </section>
    );
}
export default SearchForm;