const fs     = require('fs'),
      path   = require('path'),
      config = require('config');

module.exports = {
  "test": config.db,
  "production": config.db,
  "development": config.db,
};
