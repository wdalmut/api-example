const {
  bind,
  unary,
  pipe,
  ifElse,
  isNil,
  not,
  tap,
  identity,
  assoc,
  compose,
  equals,
  concat,
  always,
} = require('ramda');

const reject = bind(Promise.reject, Promise);
const resolve = bind(Promise.resolve, Promise);

module.exports =  {
  from_basic: (username, password) => {
    return ifElse
      (equals("waltertest"))
        (always(resolve({id: 1, username: "walter"})))
        (always(reject(null)))(username.concat(password))
  },
  from_token: (token) => {
    return ifElse
      (equals("testtoken"))
        (always(resolve({id: 1, username: "walter"})))
        (always(reject(null)))(token)
  },
}
