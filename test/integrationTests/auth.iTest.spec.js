'use strict';
const request = require('supertest');
const {startServer, stopServer} = require('../../server/server');
let authToken;


describe('Api Testings - Test Auth Apis', () => {

    beforeAll(() => {
        // Clears the database and adds some testing data.
        // Jest will wait for this promise to resolve before running tests.
        return startServer().then(() => console.log('Test Server Started'));
    });

    afterAll(() => {
        return stopServer();
    });

    it('Successful Login', () => {
        expect(1).toBe(1);
    });

});
