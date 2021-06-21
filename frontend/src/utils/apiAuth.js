class ApiAuth {
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
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`,
      },
    })
      .then(res => this._processingResponse(res));
  }

  // Успешный ответ
  // {
  //   "_id":"1f525cf06e02630312f3fed7",
  //   "email":"email@email.ru"
  // }

  signIn({ email, password }) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => this._processingResponse(res));
  }

  // Успешный ответ
  // {
  //   "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
  // }

  signUp({ email, password }) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => this._processingResponse(res));
  }

  // Успешный ответ
  // {
  //   "data": {
  //     "_id": "5f5204c577488bcaa8b7bdf2",,
  //     "email": "email@yandex.ru"
  //   }
  // } 
}

const apiAuth = new ApiAuth({
  url: 'https://auth.nomoreparties.co',
});

export default apiAuth;