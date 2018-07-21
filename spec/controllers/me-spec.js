const R = require('ramda');
const request = require('supertest');
const sequelize_fixtures = require('sequelize-fixtures');

const mock = require('mock-require');

const models = require('../../src/models');

describe("User action", () => {
  beforeEach(db_init);

  // Mock external auth module
  beforeEach(() => {
    const user = {
      id: 1,
      username: "test-user@gmail.com",
    };
    mock('../../src/auth', {
      from_basic: (username, password) => Promise.resolve(user),
      from_token: (token) => Promise.resolve(user),
    });
  })

  afterAll(mock.stopAll);

  let app;

  beforeEach((done) => {
    app = require('../..');
    done();
  });

  it("should expose my information as user", (done) => {
    request(app)
      .get('/v1/me')
      .set('Authorization', 'Bearer test')
      .expect(200)
      .end((err, res) => {
        expect(res.body.username).toEqual('test-user@gmail.com');
        done();
      });
  });
});

