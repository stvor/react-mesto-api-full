import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm name="avatar-edit" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={avatarRef} id="avatar-link-input" type="url" name="avatar-link" placeholder="Ссылка на аватар" className="form__input form__input_type_avatar-link" required />
      <span className="avatar-link-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;