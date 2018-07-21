const Joi = require('joi')
const validator = require('express-joi-validation')({})

exports.validate_user_input = validator.query({
})

exports.validate_users_input = validator.query({
  limit: Joi.number().integer().min(1).max(25).default(1),
  offset: Joi.number().integer().min(0).max(25).default(1),
  username: Joi.string().alphanum().min(1).max(25).default(null)
})

exports.validate_create_user_input = validator.body({
  username: Joi.string().min(1).required()
})

exports.validate_patch_user_input = validator.body({
  username: Joi.string().min(1).required()
})

exports.validate_me_input = validator.query({})
