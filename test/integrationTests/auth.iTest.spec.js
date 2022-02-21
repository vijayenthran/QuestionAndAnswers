'use strict';
const request = require('supertest');
const {app, startServer, stopServer} = require('../../server/server');

let authToken, userId;

describe('Integration Tests - Examine if the Apis written are functioning correctly', () => {
    let categoryResponseObj, postResponseObj, userResponseObject, commentResponseObj;
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
            .send({userId: userId})
            .expect(200)
            .then(() => stopServer());
    });

    describe('1 Categories Test', () => {
        const categoriesObj = {name: 'test-Category'};
        it('1.0 Add Categories Check', () => {
            return request(app)
                .post('/app/categories')
                .set('authorization', `bearer ${authToken}`)
                .send(categoriesObj)
                .expect(201);
        });

        it('1.1 Get Created Category and Validate that it is the same', () => {
            return request(app)
                .get('/app/categories')
                .set('authorization', `bearer ${authToken}`)
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
                .set('authorization', `bearer ${authToken}`)
                .send(categoriesObj)
                .expect(500);
        });

        it('1.3 Delete the created category - Tear Down Step for Categories', () => {
            return request(app)
                .delete('/app/categories')
                .set('authorization', `bearer ${authToken}`)
                .send({categoryName: categoriesObj.name})
                .expect(200);
        });
    });

    describe('2 Posts Test', () => {
        it('2.1 Create Posts', () => {
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
                .set('authorization', `bearer ${authToken}`)
                .send(postsObject)
                .expect(201)
                .then(postResponse => {
                    postResponseObj = postResponse.body;
                });
        });

        it('2.2 Get Post with Null category Id and Skip Limit as 0', () => {
            return request(app)
                .get('/app/posts/null?skiplimit=0')
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(galleryResponse => {
                    expect(galleryResponse.body.length).toBeGreaterThan(0);
                    expect(galleryResponse.body[0]).toMatchObject({
                        commentsList: [],
                        likedBy: [],
                        postTitle: "Test Post Title",
                        postBody: "Test Post Body",
                        categoryName: "Travel",
                        userName: "vijayvijay",
                        likeCount: 2,
                    });
                });
        });

        it('2.3 Get Post with Null category Id and Skip Limit as 5', () => {
            return request(app)
                .get('/app/posts/null?skiplimit=5')
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(galleryResponse => {
                    expect(galleryResponse.body.length).toEqual(0);
                });
        });

        it('2.4 Donot pass the null category Id, Should get a 500. Negative case', () => {
            return request(app)
                .get('/app/posts/')
                .set('authorization', `bearer ${authToken}`)
                .expect(404);
        });

        it('2.5 Donot pass the skip limit Should get a 500. Negative case', () => {
            return request(app)
                .get('/app/posts/null?null')
                .set('authorization', `bearer ${authToken}`)
                .expect(500);
        });

        it('2.6 Get Post Based on Post Id', () => {
            return request(app)
                .get(`/app/posts/post/${postResponseObj._id}`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(getDocBasedOnIdRes => {
                    expect(getDocBasedOnIdRes.body).toMatchObject({
                        commentsList: [],
                        likedBy: [],
                        postTitle: 'Test Post Title',
                        postBody: 'Test Post Body',
                        categoryName: 'Travel',
                        userName: 'vijayvijay',
                        likeCount: 2,
                    });
                });
        });

        it('2.7 Get 500 when No post id is provided', () => {
            return request(app)
                .get('/app/posts/post/')
                .set('authorization', `bearer ${authToken}`)
                .expect(500);
        });

        it('2.6 Get Post Based on Category Id', () => {
            return request(app)
                .get(`/app/posts/${postResponseObj.categoryId}?skiplimit=0`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(getDocBasedOnCategoryIdResponse => {
                    expect(getDocBasedOnCategoryIdResponse.body[0]).toMatchObject({
                        commentsList: [],
                        likedBy: [],
                        postTitle: 'Test Post Title',
                        postBody: 'Test Post Body',
                        categoryName: 'Travel',
                        userName: 'vijayvijay',
                        likeCount: 2,
                    });
                });
        });

        it('2.7 Get Post Based on Category Id', () => {
            return request(app)
                .get(`/app/posts/${postResponseObj.categoryId}?skiplimit=0`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(getDocBasedOnCategoryIdResponse => {
                    expect(getDocBasedOnCategoryIdResponse.body[0]).toMatchObject({
                        commentsList: [],
                        likedBy: [],
                        postTitle: 'Test Post Title',
                        postBody: 'Test Post Body',
                        categoryName: 'Travel',
                        userName: 'vijayvijay',
                        likeCount: 2,
                    });
                });
        });

        it('2.8 Get Post Based on Category Id without the skip limit should throw 500', () => {
            return request(app)
                .get(`/app/posts/${postResponseObj.categoryId}`)
                .set('authorization', `bearer ${authToken}`)
                .expect(500)
        });

        it('2.9 Get Post Based on Category Id without the skip limit should throw 500', () => {
            return request(app)
                .get(`/app/posts/${postResponseObj.categoryId}`)
                .set('authorization', `bearer ${authToken}`)
                .expect(500)
        });

        it('2.10 Get Post Based on Filter HOT. Validate if a response document is being returned', () => {
            return request(app)
                .get(`/app/posts/filter/?filter=HOT`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(filterHOTResponse => {
                    expect(filterHOTResponse.body.length).toBeGreaterThan(0);
                });
        });

        it('2.11 Get Post Based on Filter TOP. Validate if a response document is being returned', () => {
            return request(app)
                .get(`/app/posts/filter/?filter=TOP`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(filterTOPResponse => {
                    expect(filterTOPResponse.body.length).toBeGreaterThan(0);
                });
        });

        it('2.12 Get Post Based on Filter NEW. Validate if a response document is being returned', () => {
            return request(app)
                .get(`/app/posts/filter/?filter=NEW`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(filterNEWResponse => {
                    expect(filterNEWResponse.body.length).toBeGreaterThan(0);
                });
        });

        it('2.13 Update Post ', () => {
            let modifiedPostObject = {
                commentsList: [],
                likedBy: [],
                postTitle: "Test Post Title modified",
                postBody: "Test Post Body",
                categoryId: {_id: categoryResponseObj._id},
                categoryName: "Travel",
                userId: {_id: userResponseObject.userId},
                userName: "vijayvijay",
                likeCount: 2,
            };
            return request(app)
                .put(`/app/posts/${postResponseObj._id}`)
                .set('authorization', `bearer ${authToken}`)
                .send(modifiedPostObject)
                .expect(200);
        });

        it('2.14 Update Post without post Id should result in 500 - Negative case', () => {
            let modifiedPostObject = {
                commentsList: [],
                likedBy: [],
                postTitle: "Test Post Title modified",
                postBody: "Test Post Body",
                categoryId: {_id: categoryResponseObj._id},
                categoryName: "Travel",
                userId: {_id: userResponseObject.userId},
                userName: "vijayvijay",
                likeCount: 2,
            };
            return request(app)
                .put(`/app/posts/null`)
                .set('authorization', `bearer ${authToken}`)
                .send(modifiedPostObject)
                .expect(500);
        });

        it('2.15 Get Post Based on Post Id after the update of document', () => {
            return request(app)
                .get(`/app/posts/post/${postResponseObj._id}`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(getDocBasedOnIdRes => {
                    expect(getDocBasedOnIdRes.body).toMatchObject({
                        commentsList: [],
                        likedBy: [],
                        postTitle: 'Test Post Title modified',
                        postBody: 'Test Post Body',
                        categoryName: 'Travel',
                        userName: 'vijayvijay',
                        likeCount: 2,
                    });
                });
        });

        it('2.15 Delete Post Based on Post Id ', () => {
            return request(app)
                .delete(`/app/posts/${postResponseObj._id}`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200);
        });
    });

    describe('3 Comments Test', () => {
        it('3.1 Create Comments for Post ', () => {
            let createNewCommentObj = {
                comment: 'Hi I am Test Comment',
                postId: `${postResponseObj._id}`,
                userId: userId,
                userName: 'vijayvijay',
                likedBy: [],
                likeCount: 2
            };


            return request(app)
                .post(`/app/comments`)
                .set('authorization', `bearer ${authToken}`)
                .send(createNewCommentObj)
                .expect(201)
        });

        it('3.2 Get Comments Based on Post Id ', () => {
            return request(app)
                .get(`/app/comments/${postResponseObj._id}`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(commentsRes => {
                    commentResponseObj = commentsRes.body[0];
                    expect(commentsRes.body[0]).toMatchObject({
                        comment: 'Hi I am Test Comment',
                        userName: 'vijayvijay',
                        likedBy: [],
                        likeCount: 2
                    });
                });
        });

        it('3.2 Get Comments Without Post Id should return 500 Negative case', () => {
            return request(app)
                .get(`/app/comments/null`)
                .set('authorization', `bearer ${authToken}`)
                .expect(500);
        });

        it('3.3 Update Comment', () => {
            let modifiedCommentsObj = {
                comment: 'Hi I am Test Comment modified',
                postId: `${postResponseObj._id}`,
                userId: userId,
                userName: 'vijayvijay',
                likedBy: [],
                likeCount: 2
            };
            return request(app)
                .put(`/app/comments/${commentResponseObj._id}`)
                .set('authorization', `bearer ${authToken}`)
                .send(modifiedCommentsObj)
                .expect(200);
        });

        it('3.4 Get Comment after Updated', () => {
            return request(app)
                .get(`/app/comments/${postResponseObj._id}`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
                .then(modifiedCommentsRes => {
                    expect(modifiedCommentsRes.body[0]).toMatchObject({
                        comment: 'Hi I am Test Comment modified',
                        userName: 'vijayvijay',
                        likedBy: [],
                        likeCount: 2
                    });
                });
        });

        it('3.5 Delete Comments without passing any query params should get 500 check negative case', () => {
            return request(app)
                .delete(`/app/comments?`)
                .set('authorization', `bearer ${authToken}`)
                .expect(500)
        });

        it('3.6 Delete Comments with Comment Id', () => {
            return request(app)
                .delete(`/app/comments/?commentId=${commentResponseObj._id}`)
                .set('authorization', `bearer ${authToken}`)
                .expect(200)
        });
    });

});
