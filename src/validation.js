'use strict';

const maxMinVal = {
    userName: {
        max: 14,
        min: 5
    },
    passowrd: {
        max: 71,
        min: 8
    }
};

const checkWhiteSpace = value => {
    if (value.trim() !== value) {
        return 'Invalid entry, May hav extra Spaces'
    } else {
        return;
    }
};

const userNameGateKeeper = value => {
    if (value.length < maxMinVal.userName.min || value.length >= maxMinVal.userName.max) {
        return `UserName should be between ${maxMinVal.userName.min} and ${maxMinVal.userName.max}`
    } else {
        return;
    }
};

const passwordGateKeeper = value => {
    if (value.length < maxMinVal.passowrd.min || value.length >= maxMinVal.passowrd.max) {
        return `Password should be between ${maxMinVal.passowrd.min} and ${maxMinVal.passowrd.max}`
    } else {
        return;
    }
};

const validation = value => {
    const errors = {};

    // -------------------------- Login From Validators ------------------------------------

    if (!value.UserNameLogin) {
        errors.UserNameLogin = 'Required';
    } else if (value.UserNameLogin && checkWhiteSpace(value.UserNameLogin)) {
        errors.UserNameLogin = 'Invalid entry';
    }
    if (!value.PasswordLogin) {
        errors.PasswordLogin = 'Required';
    }

    // ------------------------- Sign Up Form Validators ------------------------------------
    if (!value.UserNameSignUp) {
        errors.UserNameSignUp = 'Required';
    } else if (value.UserNameSignUp && checkWhiteSpace(value.UserNameSignUp)) {
        errors.UserNameSignUp = 'Invalid entry';
    } else if (value.UserNameSignUp && userNameGateKeeper(value.UserNameSignUp)) {
        errors.UserNameSignUp = `UserName should be between ${maxMinVal.userName.min} and ${maxMinVal.userName.max}`
    }

    if (!value.PasswordSignUp) {
        errors.PasswordSignUp = 'Required';
    } else if (value.PasswordSignUp && passwordGateKeeper(value.PasswordSignUp)) {
        errors.PasswordSignUp = `Password should be between ${maxMinVal.passowrd.min} and ${maxMinVal.passowrd.max}`
    }

    if (!value.FirstNameSignUp) {
        errors.FirstNameSignUp = 'Required';
    }

    if (!value.LastNameSignUp) {
        errors.LastNameSignUp = 'Required';
    }

    return errors;
};

module.exports = validation;
