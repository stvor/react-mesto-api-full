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
        <form onSubmit={handleSubmit} className="form form_type_register" name="register" action="#" noValidate>
          <h1 className="form__title form__title_type_register">Регистрация</h1>
          <input value={email || ''} onChange={handleEmailChange} id="email-input" type="text" name="email" placeholder="Email" className="form__input form__input_type_register form__input_type_email" />
          <input value={password || ''} onChange={handlePasswordChange} id="password-input" type="password" name="password" placeholder="Пароль" className="form__input form__input_type_register form__input_type_password" />
          <button type="submit" className="form__submit form__submit_type_register">Зарегистрироваться</button>
          <div className="form__sign-in-wrap">
            <p className="form__sign-in-question">Уже зарегистрированы? <Link className="form__sign-in-link" to="/sign-in">Войти</Link></p>
          </div>
        </form>
        
        <InfoTooltip isOpen={props.isOpen} isRegisterSuccess={props.isRegisterSuccess} onClose={props.onClose}/>
      </section>
    </main>
  );
}

export default Register;