import React from 'react';
import about from '../../images/about.jpg';

function About() {
    return (
        <section className='about'>
            <img className='about__photo' src={about} alt='authorphoto'></img>
            <div className='about__descpiption'>
                <h4 className='subtitle'>Об авторе</h4>                
                <p className='about__paragraph'>Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
                <p className='about__paragraph'>Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>                
            </div>
        </section>
    );
}
export default About;