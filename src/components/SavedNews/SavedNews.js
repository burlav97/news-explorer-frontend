import React from 'react';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList'

function SavedNews() {
    return (
        <section className='saved-news'>
            <div className='saved-news__description'>
                <h3 className='saved-news__title'>Сохраненные статьи</h3>
                <p className='saved-news__quantity'>Грета, у вас 5 сохраненных статей</p>
                <p className='saved-news__tag'>По ключевым словам:<span className='saved-news__span'>Природа, Тайга и 2-м другим</span></p>
            </div>
            <NewsCardList/>
        </section>
    );
}

export default SavedNews;