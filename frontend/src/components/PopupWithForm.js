function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_open" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <form onSubmit={props.onSubmit} className={`form form_type_${props.name}`} name={props.name} action="#" noValidate>
          <h2 className="form__title">{props.title}</h2>
            {props.children}
          <button type="submit" className="form__submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;