import success from '../images/success-icon.svg';
import fail from '../images/fail-icon.svg';


function InfoTooltip({
  isOpen,
  isRegisterSuccess,
  onClose
}) {
  const infoTooltipClassName = `popup popup_type_tooltip ${
    isOpen && "popup_open"
  }`;

  return (
    <div className={infoTooltipClassName}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__feedback-wrapper">
          {isRegisterSuccess ? (
            <>
              <img src={success} alt="Иконка успешной регистрации"/>
              <h2 className="popup__registration-feedback">Вы успешно зарегистрировались!</h2>
            </>
          ) : (
            <>
              <img src={fail} alt="Иконка ошибки" />
              <h2 className="popup__registration-feedback">Что-то пошло не так! Попробуйте ещё раз.</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;