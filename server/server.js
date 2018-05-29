"use strict";

const express = require('express');
const path = require('path');
const app = express();
const {authRouter, verifyTokenProtected} = require('./auth');
const {userRouter} = require('./user');
const {categoryRouter} = require('./Categories');
const {postRouter} = require('./posts');
const {commentsRouter} = require('./Comments');
const bodyParser = require('body-parser');
const logger = require('../logger');
const db = require('./db');
const cors = require('cors');
let server;
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.resolve('./src')));

// Note This Middle ware should be in the starting before making any calls. to the routes. Else it would fail Giving CORS Error.
app.use(cors());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/app/categories', verifyTokenProtected, categoryRouter);
app.use('/app/posts', verifyTokenProtected, postRouter);
app.use('/app/comments', verifyTokenProtected, commentsRouter);


app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.statusCode || 500).json(error); // Get the error from the error Object or send 500
});

function startServer() {
    return db.mongooseConnect(process.env.database)
        .then(() => {
            return new Promise((resolve, reject) => {
                server = app.listen(process.env.Port, () => {
                    logger.Info(`Server Started and Successfully listening on port ${process.env.Port}`);
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
