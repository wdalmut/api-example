const view = require('../views/user')
const repo = require('../models/repo/users')
const input = require('../input-filters/users')
const error = require('../views/error')

const auth = require('@wdalmut/mini-auth');
const token = require('@wdalmut/token-auth');
const basic = require('@wdalmut/basic-auth');
const one_of = require('@wdalmut/one-of');

const { from_basic, from_token } = require('../auth');
const { view_one, view_many } = require('./helpers');

const me = (req, res) => {
  Promise.resolve(req.user)
    .then(view_one(res))
    .catch(error.generic(res))
};

let users = require('express').Router()

users.get('/',
  auth(one_of([token(from_token), basic(from_basic)])),
  input.validate_me_input,
  me
);

module.exports = users

