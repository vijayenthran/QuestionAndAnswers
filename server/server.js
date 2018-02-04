"use strict";

const express = require('express');
const path = require('path');
const app = express();
const authRouter = require('./auth/auth');
const mongoose = require('mongoose');
const config = require('../config/default');
const logger = require('../logger');
let server;

app.use(express.static(path.resolve('./client')));
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./client'));
});

function startServer() {
    return mongoose.connect(config.database)
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
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            server.close('error', (err) => {
                if (err) {
                    logger.Error(err);
                    reject(err);
                } else {
                    resolve();
                    return;
                }
            })
        });
    });
}

if (require.main === module) {
    startServer().catch(err => logger.Error(err));
}

module.exports = {app, startServer, stopServer};
