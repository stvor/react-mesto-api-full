import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace
}) {
  const placeNameRef = React.useRef();
  const placeLinkRef = React.useRef();
  
  React.useEffect(() => {
    placeNameRef.current.value = '';
    placeLinkRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm 
      name="card-add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_place-name"
        ref={placeNameRef}
        id="place-name-input"
        type="text"
        name="place-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="place-name-input-error form__input-error"></span>
      <input
        className="form__input form__input_type_place-link"
        ref={placeLinkRef}
        id="place-link-input"
        type="url"
        name="place-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="place-link-input-error form__input-error"></span>        
    </PopupWithForm>

  );
}

export default AddPlacePopup;