'use strict';
const request = require('supertest');
const {app, startServer, stopServer} = require('../../server/server');
let authToken, userId;
// const {User} = require('../../server/user/model');


describe('Api Testings - Test Auth Apis', () => {
    let categoryResponseObj;
    let postResponseObj;
    let userResponseObject;
    beforeAll(() => {
        const userObj = {
            username: 'testUser',
            password: 'testuser123',
            firstName: 'testUserFirstName',
            lastName: 'testUserLastName'
        };
        // Clears the database and adds some testing data.
        // Jest will wait for this promise to resolve before running tests.
        return startServer()
            .then(() =>
                request(app)
                    .post('/user/signUp')
                    .send(userObj)
                    .expect(201)
            )
            .then(userResponse => {
                userResponseObject = userResponse.body;
                userId = userResponse.body.userId;
                return request(app)
                    .post('/auth/login')
                    .send({username: userObj.username, password: userObj.password})
                    .expect(201);
            }).then(signUpResponse => {
                expect(signUpResponse.body).not.toBeUndefined();
                authToken = signUpResponse.body;
                return;
            });
    });

    afterAll(() => {
        return request(app)
            .delete('/user/delete')
            .send({userId : userId})
            .expect(200)
            .then(() => stopServer());
    });

    describe('1 Categories Test', () => {
        const categoriesObj = {name: 'test-Category'};
        it('1.0 Add Categories Check', () => {
            return request(app)
                .post('/app/categories')
                .set('authorization' , `bearer ${authToken}`)
                .send(categoriesObj)
                .expect(201);
        });

        it('1.1 Get Created Category and Validate that it is the same', () => {
            return request(app)
                .get('/app/categories')
                .set('authorization' , `bearer ${authToken}`)
                .expect(200)
                .then(categoryResponse => {
                    categoryResponseObj = categoryResponse.body[0];
                    expect(categoryResponse.body).not.toBeUndefined();
                    expect(categoryResponse.body[0].name).toEqual(categoriesObj.name);
                });
        });

        it('1.2 Negative Check Create a Category with the same name - Get 500 error -', () => {
            return request(app)
                .post('/app/categories')
                .set('authorization' , `bearer ${authToken}`)
                .send(categoriesObj)
                .expect(500);
        });

        it('1.3 Delete the created category - Tear Down Step for Categories', () => {
            return request(app)
                .delete('/app/categories')
                .set('authorization' , `bearer ${authToken}`)
                .send({categoryName : categoriesObj.name})
                .expect(200);
        });
    });

    describe('2 Posts Test', () => {
        it('2.1 Create Posts' , () => {
            let postsObject = {
                commentsList: [],
                likedBy: [],
                postTitle: "Test Post Title",
                postBody: "Test Post Body",
                categoryId: {_id: categoryResponseObj._id},
                categoryName: "Travel",
                userId: {_id: userResponseObject.userId},
                userName: "vijayvijay",
                likeCount: 2,
            };
           return request(app)
               .post('/app/posts')
               .set('authorization' , `bearer ${authToken}`)
               .send(postsObject)
               .expect(201);
        });
    });

});
