'use strict';

const config = {
    Port: process.env.PORT || '3000',
    database : 'mongodb://vijayjs2208:vijayjs2208@ds259119.mlab.com:59119/askmeanything' || 'mongodb://localhost/AskMeAnything',
    JWT_SECRET :process.env.JWT_SECRET || 'QWERTYUIOP{}SECRETSTRING',
    JWT_EXPIRY :process.env.JWT_EXPIRY || '7d',
    BaseURL: process.env.BaseURL || `http://localhost:3000`
};

module.exports = config;
