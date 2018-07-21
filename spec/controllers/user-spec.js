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

  it("should list users", (done) => {
    request(app)
      .get('/v1/user')
      .set('Authorization', 'Bearer test')
      .expect(200)
      .end((err, res) => {
        expect(R.map(R.pick(['username']), res.body)).toEqual([
          {username: "wdalmut"},
          {username: "gmittica"}
        ]);
        done();
      })
  })

  it("should get an user", (done) => {
    request(app)
      .get('/v1/user/1')
      .set('Authorization', 'Bearer test')
      .expect(200)
      .end((err, res) => {
        expect(R.pick(['username'], res.body)).toEqual({username: "wdalmut"});
        done();
      });
  })

  it("should reply with 404 on missing user", (done) => {
    request(app)
      .get('/v1/user/571398')
      .set('Authorization', 'Bearer test')
      .expect(404, done)
  })

  it("should create a new users", (done) => {
    request(app)
      .post('/v1/user')
      .set('Authorization', 'Bearer test')
      .send({
        username: 'test@gmail.com',
      })
      .expect(200)
      .end((err, res) => {
        expect(R.pick(['username'], res.body)).toEqual({username: "test@gmail.com"});
        expect(R.not(R.isNil(res.body.created_at))).toBe(true)
        expect(R.isNil(res.body.updated_at)).toBe(true)
        done();
      });
  })

  it("should cannot create a users with an existing username", (done) => {
    request(app)
      .post('/v1/user')
      .set('Authorization', 'Bearer test')
      .send({
        username: 'wdalmut',
      })
      .expect(409, done)
  })

  it("should update users information", (done) => {
    request(app)
      .patch('/v1/user/1')
      .set('Authorization', 'Bearer test')
      .send({
        username: 'hello',
      })
      .expect(200)
      .end((err, res) => {
        expect(R.pick(['username'], res.body)).toEqual({
          username: "hello",
        });
        expect(R.not(R.isNil(res.body.created_at))).toBe(true)
        expect(R.not(R.isNil(res.body.updated_at))).toBe(true)
        done();
      });
  })

  it("should cannot update users information on existing usernames", (done) => {
    request(app)
      .patch('/v1/user/1')
      .set('Authorization', 'Bearer test')
      .send({
        username: 'gmittica',
      })
      .expect(409, done)
  })
});
