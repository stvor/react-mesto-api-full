import React from 'react';

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
      className={popupWithFormClassName}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <span className="popup__esc-label image-popup__esc-label">Esc</span>
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