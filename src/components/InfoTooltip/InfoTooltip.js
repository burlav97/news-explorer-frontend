import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function InfoTooltip({ isOpen, onClose, changeModal }) {
  return (
    <PopupWithForm
      name={'success-register'}
      isOpen={isOpen}
      onClose={onClose}
      changeModal={changeModal}
      changeModalValue={'Войти'}
      title={'Пользователь успешно зарегистрирован'}
    />
  );
}

export default InfoTooltip;