import React from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace
}) {
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();
  
  React.useEffect(() => {
    if (!isOpen) return;

    resetFrom({}, {}, false);
  }, [isOpen, resetFrom]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(values);
  }

  return (
    <PopupWithForm 
      name="card-add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input
        className="form__input form__input_type_place-name"
        value={values.name || ''}
        onChange={handleChange}
        id="place-name-input"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="place-name-input-error form__input-error">
        {errors.name || ''}
      </span>
      <input
        className="form__input form__input_type_place-link"
        value={values.link || ''}
        onChange={handleChange}
        id="place-link-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="place-link-input-error form__input-error">
        {errors.link || ''}
      </span>        
    </PopupWithForm>

  );
}

export default AddPlacePopup;