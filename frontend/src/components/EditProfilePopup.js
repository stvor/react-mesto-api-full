import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
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
        value={name || ''}
        onChange={handleNameChange}
        id="name-input"
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="name-input-error form__input-error"></span>
      <input
        className="form__input form__input_type_profession"
        value={description || ''}
        onChange={handleDescriptionChange}
        id="profession-input"
        type="text"
        name="profession"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="profession-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;