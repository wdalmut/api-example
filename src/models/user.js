'use strict'
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    tableName: "users",
    timestamps: false,
  })
  User.associate = function (models) {
    // associations can be defined here
  }
  return User
}
