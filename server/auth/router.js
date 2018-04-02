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

const createAuthToken = function (user) {
    return jwt.sign({user}, `${config.JWT_SECRET}`, {
        subject: user.username,
        expiresIn: `${config.JWT_EXPIRY}`,
        algorithm: 'HS256'
    });
};


/*
- Util Function to Validate the User data

Return and error object to be sent to front end client
*/

function failedLoginErr() {
    let err = new Error();
    err.statusCode = 400;
    err.message = `Either the UserName or Password is not correct`;
    return err;
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
                return Promise.reject();
            }
            userInfo = userData;
            return userData.validatePassword(data.password);
        }).then(result => {
            if (!result) {
                return Promise.reject();
            } else {
                return userInfo;
            }
        });
}

/*
Middle Ware function used in /auth/post route to generate a jwt token and send it to the user in case the login is successful.
-- Returns a promise
*/
function signToken(req, res, next) {
    return validateUserData(req.body)
        .then(userInfo => {
            return createAuthToken(userInfo.serialize());
        }).then(jwtToken =>{
            res.status(201).send(jwtToken);
        })
        .catch(() => {
            next(failedLoginErr());
        });
}

authRouter.post('/login', signToken, (req, res, next) => {
    next();
});

authRouter.post('/refresh', (req, res) => {
    res.send('I am signup');
});

// router.post('/', (req, res) => {
//     res.status(201).json(res.body);
// });

module.exports = {authRouter};
