function ImagePopup({
  card,
  onClose
}) {
  const imagePopupClassName = `popup popup_type_image-popup image-popup ${
    card && "popup_open"
  }`;

  return (
    <div className={imagePopupClassName}>
      <div className="image-popup__container">
        <button
          className="popup__close image-popup__close"
          type="button"
          onClick={onClose}
        ></button>
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