const view = require('../views/user')

const { bind, unary, pipe, ifElse, isNil, not, tap, identity, assoc, compose } = require('ramda');
const reject = bind(Promise.reject, Promise);
const resolve = bind(Promise.resolve, Promise);

const exists = compose(not, isNil);

const not_found = pipe(assoc('status', 404), reject);

module.exports = {
  if_exists: ifElse(exists, resolve, not_found),
  view_one: (res) => compose(unary(bind(res.json, res)), view.one),
  view_many: (res) => compose(unary(bind(res.json, res)), view.many),
}
