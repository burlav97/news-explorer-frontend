import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import NewCard from '../NewCard/NewCard'
import './NewsCardList.css';
import { NUMBER_OF_CARDS } from '../../utils/constants';

function NewsCardList({ articles, saveArticles, onSaveArticle, setIsRegisterOpen, onDeleteArticle, cardsClassName }) {
    const [viewMore, setViewMore] = React.useState(false)
    const handleViewMore = () => {
        setViewMore(true);
    };

    return (
        <section className='cards'>
            <Switch>
                <Route exact path='/'>
                    <h2 className='cards__title'>Результаты поиска</h2>
                    <ul className='cards__list'>
                        {!viewMore
                            ? articles && articles.slice(0, NUMBER_OF_CARDS).map((article, index) => (
                                <NewCard
                                    key={index}
                                    article={article}
                                    onSaveArticle={onSaveArticle}
                                    setIsRegisterOpen={setIsRegisterOpen}
                                />
                            ))
                            : articles && articles.map((article, index) => (
                                <NewCard
                                    key={index}
                                    article={article}
                                    type='main'
                                    onSaveArticle={onSaveArticle}
                                    setIsRegisterOpen={setIsRegisterOpen}
                                />
                            ))}
                    </ul>
                    {!viewMore ? <button onClick={handleViewMore} className='cards__button'>Показать еще</button>
                        : null
                    }
                </Route>
                <Route path='/saved-news'>
                    <ul className='cards__list'>
                        {saveArticles && saveArticles.map((article) => (
                            <NewCard
                            key={article._id}
                            article={article}
                            onDeleteArticle={onDeleteArticle}
                            />
                        ))}
                    </ul>
                </Route>
            </Switch>
        </section>
    );
}

export default NewsCardList;