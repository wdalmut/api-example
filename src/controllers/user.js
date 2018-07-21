const view = require('../views/user')
const repo = require('../models/repo/users')
const input = require('../input-filters/users')
const error = require('../views/error')

const auth = require('@wdalmut/mini-auth');
const token = require('@wdalmut/token-auth');
const basic = require('@wdalmut/basic-auth');
const one_of = require('@wdalmut/one-of');

const { from_basic, from_token } = require('../auth');
const { if_exists, view_one, view_many } = require('./helpers');

const list = (req, res) => {
  repo
    .list()
    .then(view_many(res))
    .catch(error.generic(res))
}

const get = (req, res) => {
  repo
    .get(req.params.id)
    .then(if_exists)
    .then(view_one(res))
    .catch(error.generic(res))
}

const create = (req, res) => {
  repo
    .create(req.body)
    .then(view_one(res))
    .catch(error.generic(res))
}

const patch = (req, res) => {
  repo
    .update(req.params.id, req.body)
    .then(view_one(res))
    .catch(error.generic(res))
}

let users = require('express').Router()

users.get('/',
  auth(one_of([token(from_token), basic(from_basic)])),
  input.validate_users_input,
  list
);

users.get('/:id',
  auth(one_of([token(from_token), basic(from_basic)])),
  input.validate_user_input,
  get
)

users.post('/',
  auth(one_of([token(from_token), basic(from_basic)])),
  input.validate_create_user_input,
  create
)

users.patch('/:id',
  auth(one_of([token(from_token), basic(from_basic)])),
  input.validate_patch_user_input,
  patch
)

module.exports = users
