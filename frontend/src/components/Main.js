import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">

    <section className="content__profile profile">
      <button
        className="profile__avatar"
        onClick={onEditAvatar}
        alt="Изображение пользователя"
        style={{ backgroundImage: `url(${currentUser.avatar})` }}
      ></button>
      <div className="profile__info">
        <div className="profile__wrapper">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
            type="button"
          ></button>
        </div>
        <p className="profile__profession">{currentUser.about}</p>
      </div>
      <button
        className="profile__add-button"
        onClick={onAddPlace}
        type="button"
      ></button>
    </section>

    <section className="cards-grid">
      <ul className="cards-grid__list">
        {cards.map((card) => (
          <Card 
            key={card._id} 
            card={card} 
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </section>

    </main>
  );
}

export default Main;