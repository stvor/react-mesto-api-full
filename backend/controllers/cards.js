const Card = require('../models/card');
const IncorrectDataError = require('../errors/incorrect-data-err');
const NoRightsError = require('../errors/no-rights-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('likes')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') throw new IncorrectDataError('Переданы некорректные данные при создании карточки');

      throw new Error();
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('PageNotFound'))
    .then((card) => {
      if (req.user._id.toString() === card.owner.toString()) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.status(200).send(card));
      } else {
        next(new NoRightsError('Нельзя удалять чужие карточки'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new IncorrectDataError('Некорректный формат _id карточки');

      if (err.message === 'PageNotFound') throw new NotFoundError('Карточка с указанным _id не найдена');

      throw new Error();
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .orFail(new Error('PageNotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') throw new IncorrectDataError('Некорректный формат _id карточки');

      if (err.message === 'PageNotFound') throw new NotFoundError('Карточка с указанным _id не найдена');

      throw new Error();
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .orFail(new Error('PageNotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') throw new IncorrectDataError('Некорректный формат _id карточки');

      if (err.message === 'PageNotFound') throw new NotFoundError('Карточка с указанным _id не найдена');

      throw new Error();
    })
    .catch(next);
};
