import React from 'react';

function ImagePopup({
  card,
  onClose
}) {
  const isOpen = !!card;

  const imagePopupClassName = `popup popup_type_image-popup image-popup ${
    card && "popup_open"
  }`;

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget && isOpen) {
      onClose();
    }
  }

  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscPress = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={imagePopupClassName}
      onClick={handleOverlayClick}
    >
      <div className="image-popup__container">
        <button
          className="popup__close image-popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <span className="popup__esc-label image-popup__esc-label">Esc</span>
        <img
          className="image-popup__place-image"
          src={card ? card.link : ''}
          alt={card ? card.name : ''}
        />
        <p className="image-popup__place-name">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;