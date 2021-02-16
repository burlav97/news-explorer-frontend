import React from 'react';
import {Switch, Route,} from 'react-router-dom';
import './NewCard.css';

function NewCard({img, date, title, text, source, keyword, link}) {
    const [tooltipClassName, setTooltipClassName] = React.useState('card__tooltip')
    // появление tooltip по наведению на кнопку
    const mouseEnter = (e) => {
        setTooltipClassName('card__tooltip card__tooltip_active');
    }
    // исчезноваение tooltip 
    const mouseLeave = (e) => {
        setTooltipClassName('card__tooltip');
    }
    const handleOnClickSave = (e) => {
        e.target.classList.remove('card__button_type_save');
        e.target.classList.add('card__button_state_active-save');
    }
    const handleOnDelete = (e) => {
        e.target.classList.remove('card__button_type_delete');
        e.target.classList.add('card__button_state_active-del');
    }
    return (
        <li className='card'>
            <img className='card__img'  src={img} alt={title}></img>
            <div className='card__descpition'>
            <p className='card__date'>{date}</p>
            <h3 className='card__title'>{title}</h3>
            <p className='card__text'>{text}</p>
            <a className='card__source' href={link} targer>{source}</a>
            </div>
            
            <Switch>
                <Route exact path='/'>
                    <p className={tooltipClassName}>Войдите, чтобы сохранять статьи</p>
                    <button className=' card__button card__button_type_save' onClick={handleOnClickSave} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}></button>
                    
                </Route>
                <Route path='/saved-news'>
                    <p className='card__keyword'>{keyword}</p>
                    <p className={tooltipClassName}>Убрать из сохраненных</p>
                    <button className=' card__button card__button_type_delete' onClick={handleOnDelete} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}></button>
                    
                </Route>
            </Switch>
        </li>
    );
}

//может добавить просто один класс, который будет картинку выделять?
export default NewCard;