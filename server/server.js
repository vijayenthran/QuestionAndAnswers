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
app.use('/auth', authRouter);
app.use('/user', userRouter);



app.get('/a/protected', verifyTokenProtected, (req, res) => {
    res.status(200).send('Protected Route is working');
});

app.use((error, req, res, next) => {
    if (Object.keys(error).indexOf('statusCode') < 0 || Object.keys(error).indexOf('message') < 0) {
        next(error);
    } else {
        res.status(error.statusCode).json({message: error});
    }
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
