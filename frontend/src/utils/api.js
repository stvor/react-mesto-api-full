class Api {
  constructor({ url }) {
    this.url = url;
    this._headers = {
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    };
  }

  _processingResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка, код ${res.status}`))
  }

  getUser() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then(res => this._processingResponse(res));
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
    .then(res => this._processingResponse(res));
  }

  setUser(userData) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      }),
    })
    .then(res => this._processingResponse(res));
  }

  addCard(cardData) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
    .then(res => this._processingResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      },
    })
    .then(res => this._processingResponse(res));
  }

  sendLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization,
      },
    })
    .then(res => this._processingResponse(res));
  }

  sendUnlike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      },
    })
    .then(res => this._processingResponse(res));
  }

  setAvatar(avatarLink) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
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
  url: 'http://api.belib.nomoredomains.monster',
});

export default api;