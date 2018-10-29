process.env.NODE_ENV = 'development';
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../app.js');
const request = require('supertest')(app);
const seedDB = require('../seed/seed.js');
const data = require('../seed/testData/index.js');

describe('/api', function () {
  this.timeout(6000);
  let users, recipes, shoppingData;

  beforeEach(function () {
    return seedDB(data)
      .then((docs) => {
        [users, recipes, shoppingData] = docs
      })
  });

  after(() => mongoose.disconnect());

  describe('/*', () => {
    it('GET invalid path returns status 404 and message Page not found', () => {
      return request
        .get('/hello')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Page not found');
        });
    });
  });

  describe('/users', () => {
    describe('/api/users/:username', () => {
      it('GET user by username returns status 200 and object of user data', () => {
        return request
          .get(`/api/users/${users[0].username}`)
          .expect(200)
          .then((res) => {
            expect(res.body.user).to.include.keys(
              'username',
              'firstName',
              'lastName',
              'email',
            );
          });
      });
      it('POST user returns status 201 and a new user', () => {
        const newUser = {
          username: 'blinky',
          email: 'blinkyboi@email.com',
          firstName: 'blinky',
          lastName: 'the fish',
        };
        return request
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .then(({ body }) => {
            expect(body).to.include.keys(
              'username', 'firstName', 'lastName', 'email', 'profilePicture', 'address',
            );
            expect(body.username).to.equal(newUser.username);
          });
      });
    });
  });
});
