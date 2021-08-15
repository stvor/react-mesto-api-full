import React from 'react';
import { Link } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onRegister({
      email,
      password,
    });
  }

  return (
    <main className="content page__content">
      <section className="content__register register">
        <form
          className="form form_type_register"
          onSubmit={handleSubmit}
          name="register"
          action="#"
          noValidate
        >
          <h1 className="form__title form__title_type_register">Регистрация</h1>
          <input
            className="form__input form__input_type_register form__input_type_email"
            value={email || ''}
            onChange={handleEmailChange}
            id="email-input"
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            className="form__input form__input_type_register form__input_type_password"
            value={password || ''}
            onChange={handlePasswordChange}
            id="password-input"
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <button
            className="form__submit form__submit_type_register"
            type="submit"
          >Зарегистрироваться</button>
          <div className="form__sign-in-wrap">
            <p className="form__sign-in-question">Уже зарегистрированы? <Link className="form__sign-in-link" to="/sign-in">Войти</Link></p>
          </div>
        </form>
        
        <InfoTooltip
          isOpen={props.isOpen}
          isRegisterSuccess={props.isRegisterSuccess}
          onClose={props.onClose}
        />
      </section>
    </main>
  );
}

export default Register;