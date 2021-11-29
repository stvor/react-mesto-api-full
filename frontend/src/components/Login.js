import React from 'react';

function Login({ onLogin }) {
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

    onLogin({
      email,
      password,
    });
  }

  return (
    <main className="content page__content">
      <form
        className="form"
        onSubmit={handleSubmit}
        name="login"
        action="#"
        noValidate
      >
        <h1 className="form__title form__title_type_login">Вход</h1>
        <input
          className="form__input form__input_type_login form__input_type_email"
          value={email || ''}
          onChange={handleEmailChange}
          id="email-input"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="form__input form__input_type_login form__input_type_password"
          value={password || ''}
          onChange={handlePasswordChange}
          id="password-input"
          type="password"
          name="password"
          placeholder="Пароль"
        />
        <button
          className="form__submit form__submit_type_login"
          type="submit"
        >Войти</button>
      </form>
    </main>
  );
}

export default Login;