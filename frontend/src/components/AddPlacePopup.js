import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const placeNameRef = React.useRef();
  const placeLinkRef = React.useRef();
  
  React.useEffect(() => {
    placeNameRef.current.value = '';
    placeLinkRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm name="card-add" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={placeNameRef} id="place-name-input" type="text" name="place-name" placeholder="Название" className="form__input form__input_type_place-name" minLength="2" maxLength="30" required />
      <span className="place-name-input-error form__input-error"></span>
      <input ref={placeLinkRef} id="place-link-input" type="url" name="place-link" placeholder="Ссылка на картинку" className="form__input form__input_type_place-link" required />
      <span className="place-link-input-error form__input-error"></span>        
    </PopupWithForm>

  );
}

export default AddPlacePopup;