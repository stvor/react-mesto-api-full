function PopupWithForm(props) {
  const popupWithFormClassName = `popup popup_type_${props.name} ${
    props.isOpen && "popup_open"
  }`;

  return (
    <div className={popupWithFormClassName}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          className={`form form_type_${props.name}`}
          onSubmit={props.onSubmit}
          name={props.name}
          action="#"
          noValidate
        >
          <h2 className="form__title">{props.title}</h2>
            {props.children}
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