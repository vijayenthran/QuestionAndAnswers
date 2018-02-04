'use strict';

const config = {
    Port: process.env.PORT || '3000',
    database : process.env.DATABASE || 'mongodb://localhost/AskMeAnything',
};

module.exports = config;
