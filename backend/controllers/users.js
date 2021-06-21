const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const IncorrectDataError = require('../errors/incorrect-data-err');
const NotFoundError = require('../errors/not-found-err');
const RegistrationError = require('../errors/registration-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('PageNotFound'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') throw new IncorrectDataError('Некорректный формат _id пользователя');

      if (err.message === 'PageNotFound') throw new NotFoundError('Пользователь с таким _id не найден');

      throw new Error();
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      // eslint-disable-next-line no-shadow
      const { password, ...userData } = user.toObject();
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') throw new IncorrectDataError('Переданы некорректные данные при создании пользователя');

      if (err.name === 'MongoError' && err.code === 11000) throw new RegistrationError('Пользователь с таким email уже существует');

      throw new Error();
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('PageNotFound'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') throw new IncorrectDataError('Переданы некорректные данные при обновлении профиля');

      if (err.message === 'PageNotFound') throw new NotFoundError('Пользователь с таким _id не найден');

      throw new Error();
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('PageNotFound'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') throw new IncorrectDataError('Переданы некорректные данные при обновлении аватара');

      if (err.message === 'PageNotFound') throw new NotFoundError('Пользователь с таким _id не найден');

      throw new Error();
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'key', { expiresIn: '7d' });

      res.status(200).send({ token });
    })
    .catch(next);
};
