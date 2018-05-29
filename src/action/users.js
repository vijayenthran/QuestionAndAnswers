'use strict';

import {SubmissionError} from 'redux-form'
import config from '../../config/clientConfig';
import axios from 'axios';

const errorMappingUtil = error => {
    const err = error.response.data;
    if (err.location === 'username') {
        return {
            UserNameSignUp: err.detailMessage,
            _error: 'SignUp Failed, Please correct the errors and try again'
        }
    } else if (err.location === 'password') {
        return {
            PasswordSignUp: err.detailMessage,
            _error: 'SignUp Failed, Please correct the errors and try again'
        }
    }
};

const _registerUser = userInfo => dispatch => {
    return axios.post(`${config.BaseURL}/user/signUp`, {
        username: userInfo.UserNameSignUp,
        password: userInfo.PasswordSignUp,
        firstName: userInfo.FirstNameSignUp,
        lastName: userInfo.LastNameSignUp,
    })
        // .then(value => )
        .catch(error => {
            if (Object.keys(error.response.data).length > 0 && error.response.data.reason === 'ValidationError') {
                return Promise.reject(new SubmissionError(errorMappingUtil(error)));
            } else {
                return Promise.reject(new SubmissionError({_error: 'SignUp Failed, Please correct the errors and try again'}));
            }
        });

};

module.exports = {
    registerUser: _registerUser,
};
