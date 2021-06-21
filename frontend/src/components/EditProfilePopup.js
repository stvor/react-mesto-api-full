import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile-edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input value={name || ''} onChange={handleNameChange} id="name-input" type="text" name="name" placeholder="Имя" className="form__input form__input_type_name" minLength="2" maxLength="40" required />
      <span className="name-input-error form__input-error"></span>
      <input value={description || ''} onChange={handleDescriptionChange} id="profession-input" type="text" name="profession" placeholder="Профессия" className="form__input form__input_type_profession" minLength="2" maxLength="200" required />
      <span className="profession-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;