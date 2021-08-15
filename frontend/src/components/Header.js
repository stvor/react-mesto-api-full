import logo from '../images/logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип из слов Mesto и Russia"
      />
      <div className="header__user-wrapper">
        <Switch>
          <Route path="/sign-up">
            <Link
              className="header__link"
              to="/sign-in"
            >Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Link
              className="header__link"
              to="/sign-up"
            >Регистрация</Link>
          </Route>
          <Route exact path="/">
            <span className="header__email">{props.email}</span>
            <button
              className="header__sign-out"
              onClick={props.onSignOut}
            >Выйти</button>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;