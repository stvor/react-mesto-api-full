import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import apiAuth from '../utils/apiAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const history = useHistory();

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiAuth.getUser(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }  
  
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  
  function handleUpdateUser(userData) {
    api.setUser(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleUpdateAvatar({avatar}) {
    api.setAvatar(avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  function closeAllPopups() {
    setSelectedCard();

    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.sendLike(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      api.sendUnlike(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  function handleCardDelete(card) {
    if (card.owner._id === currentUser._id) {
      api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleLogin(loginData) {
    apiAuth.signIn(loginData)
      .then(res => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        setEmail(loginData.email);
        history.push('/');
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function handleRegister(registerData) {
    apiAuth.signUp(registerData)
      .then(() => {
        setIsRegisterSuccess(true);
      })
      .catch(err => {
        setIsRegisterSuccess(false);
        console.log(err)
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      })
  }

  React.useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={email} loggedIn={loggedIn} onSignOut={handleSignOut} />
          <Switch>
            <Route path="/sign-up">
              <Register 
                onRegister={handleRegister} 
                isOpen={isInfoTooltipOpen} 
                isRegisterSuccess={isRegisterSuccess}
                onClose={closeAllPopups}
              />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={(card) => handleCardClick(card)}
              onCardLike={(card) => handleCardLike(card)}
              onCardDelete={(card) => handleCardDelete(card)}
            />
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" /> }
            </Route>
          </Switch>
          <Footer />
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name="delete-submit" title="Вы уверены?" onClose={closeAllPopups} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
