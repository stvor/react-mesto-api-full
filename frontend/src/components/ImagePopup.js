function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image-popup image-popup ${props.card ? "popup_open" : ""}`}>
      <div className="image-popup__container">
        <button
          className="popup__close image-popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="image-popup__place-image"
          src={props.card ? props.card.link : ''}
          alt={props.card ? props.card.name : ''}
        />
        <p className="image-popup__place-name">{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;