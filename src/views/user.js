const R = require('ramda')

const fields = ['id', 'username', 'created_at', 'updated_at']

module.exports = {
  one: (user) => {
    return R.pick(fields, user)
  },
  many: (users) => {
    return R.map(R.pick(fields))(users)
  }
}
