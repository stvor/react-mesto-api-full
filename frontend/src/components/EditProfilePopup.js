import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();
  
  React.useEffect(() => {
    if (!isOpen) return;

    if (currentUser) {
      resetFrom(currentUser, {}, true);
    }
  }, [currentUser, resetFrom, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_name"
        value={values.name || ''}
        onChange={handleChange}
        id="name-input"
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="name-input-error form__input-error">
        {errors.name || ''}
      </span>
      <input
        className="form__input form__input_type_profession"
        value={values.about || ''}
        onChange={handleChange}
        id="profession-input"
        type="text"
        name="about"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="profession-input-error form__input-error">
        {errors.about || ''}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;