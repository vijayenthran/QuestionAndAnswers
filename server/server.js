"use strict";

const express = require('express');
const path = require('path');
const app = express();
const {authRouter, verifyTokenProtected} = require('./auth');
const {userRouter} = require('./user');
const bodyParser = require('body-parser');
const config = require('../config/default');
const logger = require('../logger');
const db = require('./db');
let server;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve('./src')));

// Note This Middle ware should be in the starting before making any calls. to the routes. Else it would fail Giving CORS Error.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    next();
});


app.use('/auth', authRouter);
app.use('/user', userRouter);

app.get('/a/protected', verifyTokenProtected, (req, res) => {
    res.status(200).send('Protected Route is working');
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json(error); // Get the error from the error Object or send 500
});

function startServer() {
    return db.mongooseConnect(config.database)
        .then(() => {
        return new Promise((resolve, reject) => {
            server = app.listen(config.Port, () => {
                logger.Info(`Server Started and Successfully listening on port ${config.Port}`);
                resolve();
                return;
            }).on('error', (err) => {
                logger.Error(err);
                reject(err);
            });
        });
    });
}

function stopServer() {
    return db.mongooseDisconnect().then(() => {
        return new Promise((resolve, reject) => {
            server.close('error', (err) => {
                if (err) {
                    logger.Error(err);
                    reject(err);
                } else {
                    resolve();
                    return;
                }
            });
        });
    });
}

if (require.main === module) {
    startServer().catch(err => logger.Error(err));
}

module.exports = {app, startServer, stopServer};
