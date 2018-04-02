'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Returns Promise
function mongooseConnect(database){
    return mongoose.connect(database);
}

// Returns Promise
function mongooseDisconnect(){
    return mongoose.disconnect();
}

module.exports = {mongooseConnect, mongooseDisconnect};
