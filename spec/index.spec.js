process.env.NODE_ENV = 'development';
const data = require('../seed/testData/index.js')
const seedDB = require('../seed/seed.js');
const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../app.js');
const request = require('supertest')(app);

describe('/api', () => {
  let users, recipes, shoppingData;
  beforeEach(function () {
    return seedDB(data)
      .then((docs) => {
        [users, recipes, shoppingData] = docs
      })
  });
  after(() => mongoose.disconnect())

  describe("/*", () => {
    it('GET any other path returns status 404 and message Page not found', () => {
      return request
        .get("/hello")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Page not found');
        });
    });
  });
  describe("/api/users/:username", () => {
    it('GET user by username returns status 200 and object of user data', () => {
      return request
      .get(`/api/users/${users[0].username}`)
      .expect(200)
      .then(res => {
        expect(res.body.user).to.include.keys(
          "username",
          "firstName",
          "lastName",
          "email",
        )
      })
    } )
  })
});