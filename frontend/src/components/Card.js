import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `cards-grid__delete-button ${
      isOwn && "cards-grid__delete-button_visible"
    }`;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `cards-grid__like-button ${
      isLiked && "cards-grid__like-button_active"
    }`;

  function handleClick() {
    onCardClick(card);
  }
  
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="cards-grid__list-item">
      <img
        className="cards-grid__image"
        src={card.link} alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="cards-grid__heading-wrap">
        <h2 className="cards-grid__heading">{card.name}</h2>
        <div className="cards-grid__like-wrap">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="cards-grid__likes-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;