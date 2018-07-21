const { assoc, ifElse, isNil, bind } = require('ramda');
const User = require('../').User;

const resolve = bind(Promise.resolve, Promise)
const reject = bind(Promise.reject, Promise)
const reject_because_already_exists = (user) => reject({status: 409, message: 'Already exists'})

module.exports = {
  list: (params) => {
    return User.findAll();
  },
  get: (id) => {
    return User.find({
      where: { id }
    });
  },
  create: (body) => {
    return User.find({where: { username: body.username }})
      .then(ifElse(isNil, resolve, reject_because_already_exists))
      .then(() => User.create(assoc('created_at', new Date(), body)))
      .then((user) => User.find({
        where: { id: user.id },
      }))
  },
  update: (id, content) => {
    content = assoc('updated_at', new Date(), content);

    return User.find({where: { username: content.username }})
      .then(ifElse(isNil, resolve, reject_because_already_exists))
      .then(() => User.update(content, {where: {id}}))
      .then((user) => User.find({
        where: { id: id },
      }))
  },
};
