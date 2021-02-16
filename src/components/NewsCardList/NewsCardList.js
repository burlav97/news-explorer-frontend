import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import NewCard from '../NewCard/NewCard'
import arrayCards from '../../utils/cards';
import './NewsCardList.css';

function NewCardList() {
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
                            ? arrayCards.slice(0, 3).map((card) => (
                                <NewCard
                                    key={card._id}
                                    img={card.img}
                                    title={card.title}
                                    text={card.text}
                                    link={card.link}
                                    source={card.source}
                                    date={card.date}
                                    keyword={card.keyword}
                                />
                            ))
                            : arrayCards.map((card) => (
                                <NewCard
                                    key={card._id}
                                    img={card.img}
                                    title={card.title}
                                    text={card.text}
                                    link={card.link}
                                    source={card.source}
                                    date={card.date}
                                    keyword={card.keyword}
                                />
                            ))}
                    </ul>
                    <button onClick={handleViewMore} className='cards__button'>Показать еще</button>
                </Route>
                <Route path='/saved-news'>
                    <ul className='cards__list'>
                              {  arrayCards.map((card) => (
                              <NewCard
                                    img={card.img}
                                    title={card.title}
                                    text={card.text}
                                    link={card.link}
                                    source={card.source}
                                    date={card.date}
                                    keyword={card.keyword}
                                    key={card._id}
                                />
                              ))}
                    </ul>
                </Route>
            </Switch>
        </section>
    );
}

export default NewCardList;