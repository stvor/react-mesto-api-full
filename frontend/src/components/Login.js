import React from 'react';

function Login(props) {
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

    props.onLogin({
      email,
      password,
    });
  }

  return (
    <main className="content page__content">
      <section className="content__login login">
        <form className="form form_type_login" onSubmit={handleSubmit} name="login" action="#" noValidate>
          <h1 className="form__title form__title_type_login">Вход</h1>
          <input value={email || ''} onChange={handleEmailChange} id="email-input" type="text" name="email" placeholder="Email" className="form__input form__input_type_login form__input_type_email" />
          <input value={password || ''} onChange={handlePasswordChange} id="password-input" type="password" name="password" placeholder="Пароль" className="form__input form__input_type_login form__input_type_password" />
          <button type="submit" className="form__submit form__submit_type_login">Войти</button>
        </form>
      </section>
    </main>
  );
}

export default Login;