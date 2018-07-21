const db = require('../../src/models');
const sequelize_fixtures = require('sequelize-fixtures');

global.db_init = (done) => {
    return db.User.destroy({where: {}})
      .then(() => {
        return sequelize_fixtures.loadFile('spec/fixtures/test_data.json', db, {log: () => {}})
      })
      .then(() => {
        return done();
      }).catch((err) => {
        fail(err)
        done();
      });
}
