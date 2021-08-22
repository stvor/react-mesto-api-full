import React from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar
}) {
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();

  React.useEffect(() => {
    if (!isOpen) return;

    resetFrom({}, {}, false);
  }, [isOpen, resetFrom]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_avatar-link"
        value={values.avatar || ''}
        onChange={handleChange}
        id="avatar-link-input"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="avatar-link-input-error form__input-error">
        {errors.avatar || ''}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;