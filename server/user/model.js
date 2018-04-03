const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
});

// The statics method is like attaching the hashPassword function to the Schema itself.
// Returns a Promise. Please refer the original Bcrypt.js file. If there is no callback provided they return a promise.
userSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};

userSchema.methods.serialize = function () {
    return {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName
    }
};

// The methods determine attaching the validatePassword function to the Documents returned as a result of a query.
// Returns a Promise. Please refer the original Bcrypt.js file. If there is no callback provided they return a promise.
userSchema.methods.validatePassword = function (passwordString) {
    return bcrypt.compare(passwordString, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = {User};
