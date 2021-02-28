import React from 'react';
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import CurrentUserContext from '../../utils/CurrentUserContext.js';

function SavedNews({ saveArticles, onDeleteArticle }) {
    const [keywords, setKeywords] = React.useState([]);
    const [keywordsList, setKeywordsList] = React.useState('');
    const [declination, setDeclination] = React.useState('');
    const [keywordsAdditional, setKeywordsAdditional] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);
    const userName = currentUser.name;

    React.useEffect(() => {
        const arrayOfKeywords = saveArticles.map((item) => item.keyword).sort();
        const uniqueArrayKeywords = arrayOfKeywords.filter(function (item, pos) {
            return arrayOfKeywords.indexOf(item) === pos;
        });
        setKeywords(uniqueArrayKeywords);
    }, [saveArticles, userName]);

    React.useEffect(() => {
        const numberOfKeywords = keywords.length;
        if (numberOfKeywords > 2) {
            const words = keywords.slice(0, 2).join(', ');
            setKeywordsList(words);
            setDeclination('сохраненных статьи');
            setKeywordsAdditional(` и ${numberOfKeywords - 2}-му другому`);
        } else {
            setKeywordsList(keywords);
            setDeclination('сохраненных статей');
            setKeywordsAdditional('');

        }
    }, [keywords]);

    return (
        <section className='saved-news'>
            <div className='saved-news__description'>
                <h3 className='saved-news__title'>Сохраненные статьи</h3>
                <p className='saved-news__quantity'>{userName}, у вас  {saveArticles.length} {declination}</p>
                <p className='saved-news__tag'>По ключевым словам:<span className='saved-news__span'> {keywordsList}, {keywordsAdditional}</span></p>
            </div>
            <NewsCardList
                saveArticles={saveArticles}
                onDeleteArticle={onDeleteArticle}
              />
        </section>
    );
}

export default SavedNews;