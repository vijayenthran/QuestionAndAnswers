const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const config = require('../../config/default');
const {User} = require('../user/model');


/*
Notes
The Auth Router only has apis that validate a user sign in and generation of Jwt tokens in response.
/login    - Login with valid Credentials
/refresh  - Refresh the jwt token
*/


/*
Error object to be sent to frontend client
*/
let errorObj = {
    failedLoginErr: function () {
        let err = new Error();
        err.statusCode = 400;
        err.message = `Either the UserName or Password is not correct`;
        return err;
    },
    forbiddenErr: function () {
        let err = new Error();
        err.statusCode = 403;
        err.message = `Forbidden`;
        return err;
    },
    badRequest: function () {
        let err = new Error();
        err.statusCode = 400;
        err.message = `Bad request User Not Found`;
        return err;
    },
    InvalidJWT: function () {
        let err = new Error();
        err.statusCode = 401;
        err.message = `Please login Again`;
        return err;
    }
};


const createAuthToken = function (user) {
    return jwt.sign({user}, `${config.JWT_SECRET}`, {
        subject: user.username,
        expiresIn: `${config.JWT_EXPIRY}`,
        algorithm: 'HS256'
    });
};

/*
- Validate the JWT auth Token
-- Returns a promise
*/
const validateAuthToken = function (token) {
    let decodedObj;
    return new Promise((resolve, reject) => {
        try {
            decodedObj = jwt.verify(token, config.JWT_SECRET);
        } catch (err) {
            reject(errorObj.InvalidJWT())
        }
        resolve(decodedObj);
    });
};


/*
- Validate the user exists in the db
- helper for verify token method
-- Returns a promise
*/


function validateUserExistence(data) {
    return User.findOne({username: data.username})
        .then(userData => {
            if (userData === null) {
                return Promise.reject(errorObj.badRequest());
            }
            return userData;
        });
}

/*
- Util Function to Validate the User data
- First Find if the user is present in the Database.
- If the user is present get the salted hash passowrd.
- Compare it with the password sent from the  front end.
- how bcrypt figure out to validate. The hashed password in the db already gives it enough information like salt to hash the passoword sent from front end and compare both the values
- If both the values are same then the algorithm returns true

-- Returns a promise
*/

function validateUserData(data) {
    let userInfo;
    return User.findOne({username: data.username})
        .then(userData => {
            if (userData === null) {
                return Promise.reject(errorObj.badRequest());
            }
            userInfo = userData;
            return userData.validatePassword(data.password);
        }).then(result => {
            if (!result) {
                return Promise.reject(); // There is no error object passed here because in the call site we already pass the desired error. Please look at the call site.
            } else {
                return userInfo;
            }
        });
}

/*
Middle Ware function used in /auth/login route to generate a jwt token and send it to the user in case the login is successful.
-- Returns a promise
*/
function signToken(req, res, next) {
    return validateUserData(req.body)
        .then(userInfo => {
            return createAuthToken(userInfo.serialize());
        }).then(jwtToken => {
            res.status(201).send(jwtToken);
        })
        .catch(err => {
            if (err) {
                next(err);
            } else {
                next(errorObj.failedLoginErr());
            }
        });
}

/*
Middle Ware function used in /auth/refresh route to refresh a JWT token
-- Returns a promise
*/

// TODO Discuss how to get the author token from the header. Enquire if there is a better way to do that.
function verifyTokenforRefresh(req, res, next) {
    let token = req.headers.author.split(' ')[1];
    return validateAuthToken(token)
        .then(validateToken => {
            return validateUserExistence(validateToken.user)
        })
        .then(userInfo => {
            return createAuthToken(userInfo.serialize());
        }).then(jwtToken => {
            res.status(201).send(jwtToken);
        })
        .catch(err => {
            if (err) {
                next(err);
            } else {
                next(errorObj.forbiddenErr());
            }
        });
}

/*
Middle Ware function used in protected routes
-- Returns a promise
*/

// TODO Discuss how to get the author token from the header. Enquire if there is a better way to do that.
function verifyTokenProtected(req, res, next) {
    let token = req.headers.author.split(' ')[1];
    return validateAuthToken(token)
        .then(validateToken => {
            return validateUserExistence(validateToken.user)
        }).then(() => {
            next();
        }).catch(err => {
            if (err) {
                next(err);
            } else {
                next(errorObj.forbiddenErr());
            }
        });
}

authRouter.post('/login', signToken, (req, res, next) => {
    next();
});

authRouter.post('/refresh', verifyTokenforRefresh, (req, res, next) => {
    next();
});

module.exports = {authRouter, verifyTokenProtected};
