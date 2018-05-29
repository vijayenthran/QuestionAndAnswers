'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const logger  = require('../logger');

// Returns Promise
function mongooseConnect(database){
    return mongoose.connect(database)
        .then(logger.Info('Mongoose Connection is Successful'));
}

// Returns Promise
function mongooseDisconnect(){
    return mongoose.disconnect()
        .then(logger.Info('Mongoose Connection disconnected Successfully'));
}

module.exports = {mongooseConnect, mongooseDisconnect};
