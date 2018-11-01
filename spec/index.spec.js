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
  describe('/recipes', () => {
    describe('/api/recipes/:user_id', () => {
      it('GET responds with a user\'s recipies', () => {
        return request
          .get(`/api/recipes/${users[0]._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.recipes[0]).to.include.keys(
              'name', 'user', 'servings', 'ingredients'
            );
          });
      });
      it('POST creates a new recipe and assigns it to a user', () => {
        const newRecipe = {
          name: 'chocolate brownies',
          servings: 8,
          ingredients: [
            {
              name: 'chocolate',
              amount: '5',
              units: 'kg',
            },
            {
              name: 'brownie',
              amount: '3',
              units: 'squares',
            }
          ]
        }
        return request
          .post(`/api/recipes/${users[0]._id}`)
          .send(newRecipe)
          .expect(201)
          .then(({ body }) => {
            expect(body.recipe.name).to.equal(newRecipe.name);
            expect(body.recipe.ingredients[0].name).to.eql(newRecipe.ingredients[0].name);
          });
      });
    });
    describe('/api/recipes/:recipe_id', () => {
      it('DELETE removes a recipe', () => {
        return request
          .delete(`/api/recipes/${recipes[0]._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body.recipe.name).to.equal(recipes[0].name);
          });
      });
    });
    describe('/api/shopping-list/:user_id', () => {
      it('GET returns a shopping list for a user by their id', () => {
        return request
        .get(`/api/shopping-lists/${users[0]._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.shoppingList).to.include.keys(
            'recipes', 'user', 'ingredients'
          );
      });
    });
  });
  describe('/api/shopping-lists/:user_id', () => {
    it('DELETE returns an empty shopping list', () => {
      return request
        .delete(`/api/shopping-lists/${users[0]._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.shoppingList.recipes.length).to.equal(0)
          expect(body.shoppingList.ingredients.length).to.equal(0)
        });
    });
  });
  describe('/api/shopping-lists/:user_id/:recipe_id', () => {
    it('PATCH shopping list to add a recipe adds recipe to array of recipes in shopping list', () => {
      return request
        .patch(`/api/shopping-lists/${users[0]._id}/${recipes[0]._id}?update=add`)
        .expect(200)
        .then(({ body }) => {
          expect(body.shoppingList.recipes.length).to.equal(2)
        });
    });
  });
  describe('/api/shopping-lists/:user_id/:recipe_id', () => {
    it('PATCH to remove recipe removes a recipe from the recipe array in the shopping list', () => {
      return request
        .patch(`/api/shopping-lists/${users[0]._id}/${recipes[0]._id}?update=remove`)
        .expect(200)
        .then(({ body }) => {
          expect(body.shoppingList.recipes.length).to.equal(0)
        });
    });
  });
});
});
