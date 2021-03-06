import { BASE_URL } from './../utils/constants';

class Api {
  constructor({ url }) {
    this.url = url;
  }

  _processingResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка, код ${res.status}`))
  }

  getUser(jwt) {
    return fetch(`${this.url}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      },
    })
      .then(res => this._processingResponse(res));
  }

  getInitialCards(jwt) {
    return fetch(`${this.url}/cards`, {
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      },
    })
    .then(res => this._processingResponse(res));
  }

  setUser(userData, jwt) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      }),
    })
    .then(res => this._processingResponse(res));
  }

  addCard(cardData, jwt) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
    .then(res => this._processingResponse(res));
  }

  deleteCard(cardId, jwt) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      },
    })
    .then(res => this._processingResponse(res));
  }

  sendLike(cardId, jwt) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      },
    })
    .then(res => this._processingResponse(res));
  }

  sendUnlike(cardId, jwt) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      },
    })
    .then(res => this._processingResponse(res));
  }

  setAvatar(avatarLink, jwt) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    })
    .then(res => this._processingResponse(res));
  }

  first(...args) {
    return Promise.all([...args]);
  }
}

const api = new Api({
  url: `${BASE_URL}`
});

export default api;