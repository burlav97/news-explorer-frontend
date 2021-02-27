import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import { getArticleDate } from '../../utils/date';
import imageDefult from '../../images/image_01.jpg';
import './NewCard.css';

function NewCard({ article, onSaveArticle, setIsRegisterOpen, onDeleteArticle }) {
    const [tooltipClassName, setTooltipClassName] = React.useState('card__tooltip');
    const [toSaveArticle, setToSaveArticle] = React.useState({
        keyword: '',
        title: '',
        text: '',
        date: '',
        source: '',
        link: '',
        image: '',
        _id: '',
    });

    React.useEffect(() => {
        setToSaveArticle({
            keyword: article.keyword,
            title: article.title,
            text: article.description,
            date: article.publishedAt,
            source: article.source.name,
            link: article.url,
            image: article.urlToImage,
            _id: article._id,
        })
    }, [article]);
    // появление tooltip по наведению на кнопку
    const mouseEnter = () => {
        if (!localStorage.getItem('jwt')) {
            setTooltipClassName('card__tooltip card__tooltip_active');
        };
    };
    // исчезноваение tooltip 
    const mouseLeave = () => {
        setTooltipClassName('card__tooltip');
    }
    const handleOnClickSave = (e) => {
        if (localStorage.getItem('jwt')) {
            e.target.classList.remove('card__button_type_save');
            e.target.classList.add('card__button_type_save-active');
        } else {
            setIsRegisterOpen(true);
        }
    }
    const handleOnDelete = (e) => {
        onDeleteArticle(toSaveArticle);
    }
    return (
        <li className='card'>
            <img className='card__img' src={article.urlToImage || article.image || imageDefult} alt={article.title || 'фоновая картинка'}  />
            <div className='card__descpition'>
                <p className='card__date'>{getArticleDate(article.publishedAt || article.date || '')}</p>
                <h3 className='card__title'>{article.title || ''}</h3>
                <p className='card__text'>{article.description || article.text || ''}</p>
                <a className='card__source' href={article.url || article.link || ''}  target='blank'>{article.source.name || article.source || ''}</a>
            </div>

            <Switch>
                <Route exact path='/'>
                    <p className={tooltipClassName}>Войдите, чтобы сохранять статьи</p>
                    <button className={article.isSaved === false ? 'card__button card__button_type_save' : 'card__button card__button_type_save-active'}  type='submit' onClick={handleOnClickSave} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} disabled={article.isSaved === true} ></button>

                </Route>
                <Route path='/saved-news'>
                    <p className='card__keyword'>{article.keyword || ''}</p>
                    <p className={tooltipClassName}>Убрать из сохраненных</p>
                    <button className=' card__button card__button_type_delete' type='submit' onClick={handleOnDelete} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}></button>

                </Route>
            </Switch>
        </li>
    );
}

export default NewCard;