'use strict';

const config = {
    BaseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://frozen-shelf-33254.herokuapp.com'
};

module.exports = config;
