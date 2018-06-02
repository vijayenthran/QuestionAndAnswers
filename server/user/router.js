const express = require('express');
const userRouter = express.Router();
const {User} = require('./model');


/*Before Storing the User into the Db perform certain checks to Validate if the information that is sent by the user is Valid.
* 1) First check if all the fields have been sent correctly atleast the required ones.
* 2) Check for non string fields, because if we store non string fields our db will throw error.
* 3) Check if there are any white spaces at the beginning or ending of the fields. The white spaces should not be trimmed.
* 4) Check the user name and password field lengths. Particularly for password the password maximum length can be only 72. After that It will be hard for bcrypt to work.
* 5) Check if the userName has already been taken.
*
* /// If all the above criteria passes then we store the User into the Database.
* */

userRouter.post('/signUp', (req, res, next) => {

    // Common Validation fields are used for several Validation, Using the same arr
    // Strict validation fields are used for user name and password
    const commonValidationFields = ['username', 'password', 'firstName', 'lastName'];
    const strictValidationFields = ['username', 'password'];


    // 1) First check if all the fields have been sent correctly atleast the required ones.
    let _reqBodyValidation = strictValidationFields.find(field => field in req.body === false);

    if (_reqBodyValidation) {
        let err = new Error();
        err.reason = 'ValidationError';
        err.location = _reqBodyValidation;
        err.statusCode = 422;
        err.detailMessage = `Missing Field`;
        return next(err);    // Make sure to have a return here to have the control come out of this function,OtherWise the Below Code will be executed. Resulting in Un wanted Server error.
    }

    //---------------------------------------------------------------- ----------------------------------------------------------------

    // 2) Check for non string fields, because if we store non string fields our db will throw error.
    let _reqBodyStringValidation = commonValidationFields.find(field => typeof req.body[field] !== 'string');


    if (_reqBodyStringValidation) {
        let err = new Error();
        err.reason = 'ValidationError';
        err.location = _reqBodyStringValidation;
        err.statusCode = 422;
        err.detailMessage = `Incorrect field type: expected string`;
        return next(err);
    }

    //---------------------------------------------------------------- ----------------------------------------------------------------

    /*  3) Check if there are any white spaces at the beginning or ending of the fields. The white spaces should not be trimmed.
        If the username and password aren't trimmed we give an error.  Users might
        expect that these will work without trimming (i.e. they want the password
        "foobar ", including the space at the end).  We need to reject such values
        explicitly so the users know what's happening, rather than silently
        trimming them and expecting the user to understand.
        We'll silently trim the other fields, because they aren't credentials used
        to log in, so it's less of a problem.*/

    let _reqBodyTrimValidation = commonValidationFields.find(field => req.body[field] !== req.body[field].trim());

    if (_reqBodyTrimValidation) {
        let err = new Error();
        err.reason = 'ValidationError';
        err.location = _reqBodyTrimValidation;
        err.statusCode = 422;
        err.detailMessage = 'Cannot start or end with whitespace';
        return next(err);
    }

    //---------------------------------------------------------------- ----------------------------------------------------------------

    // 4) Check the user name and password field lengths. Particularly for password the password maximum length can be only 72. After that It will be hard for bcrypt to work.

    let lengthCheckFields = {
        username: {
            min: 5,
            max: 15
        },
        password: {
            min: 8,
            max: 71
        },
        calculateLength: function (string) {
            return string.length
        },
        constructErrObject: function (errField, minormax) {
            let err = new Error();
            err.reason = 'ValidationError';
            err.location = errField;
            err.statusCode = 422;
            err.detailMessage = `${errField} should be a minimum of ${minormax.min}, but not more than ${minormax.max} Characters`;
            return next(err);
        },
        validateMinorMax: function (string, validateField) {
            let length = this.calculateLength(string);
            if (length < this[validateField].min || length > this[validateField].max) {
                return this.constructErrObject(validateField, this[validateField]);
            } else {
                return;
            }
        }
    };

    function checkLength() {
        lengthCheckFields.validateMinorMax(req.body.username, 'username');
        lengthCheckFields.validateMinorMax(req.body.password, 'password');
    }

    checkLength();

    //---------------------------------------------------------------- ----------------------------------------------------------------

    // 5) Check if the userName has already been taken.

    return User.find({username: req.body.username})
        .then(users => {
            if (users.length > 0) {
                let err = new Error();
                err.reason = 'ValidationError';
                err.location = 'username';
                err.statusCode = 422;
                err.detailMessage = `User name already taken`;
                return next(err);
            } else {
                return User.hashPassword(req.body.password);
            }
        })
        .then(hashpassword => {
            let {username, firstName, lastName} = req.body;
            return User.create({
                username, password: hashpassword, firstName, lastName
            })
        }).then(doc => {
            res.status(201).json(doc.serialize());
        }).catch(err => next(err));
});

userRouter.delete('/delete', (req, res, next) => {
    return User.deleteOne({_id: req.body.userId})
        .then(() => res.status(200).end())
        .catch(err => next(err));
});

module.exports = {userRouter};
