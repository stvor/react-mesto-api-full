function PopupWithForm({
  name,
  title,
  onClose,
  isOpen,
  onSubmit,
  children
}) {
  const popupWithFormClassName = `popup popup_type_${name} ${
    isOpen && "popup_open"
  }`;

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget && isOpen) {
      onClose();
    }
  }

  return (
    <div
      className={popupWithFormClassName}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <form
          className={`form form_type_${name}`}
          onSubmit={onSubmit}
          name={name}
          action="#"
          noValidate
        >
          <h2 className="form__title">{title}</h2>
            {children}
          <button
            className="form__submit"
            type="submit"
          >Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;