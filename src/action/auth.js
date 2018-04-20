'use strict';

import {SubmissionError} from 'redux-form'
import config from '../../config/default';
import axios from 'axios';
import {saveAuthToken, clearAuthToken} from '../localStorage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const setLoggedIn = loggedInValue => ({
    type: SET_LOGGED_IN,
    loggedInValue
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});


export const logOut = value => dispatch => {
    dispatch(setLoggedIn(value));
    dispatch(clearAuth());
    return clearAuthToken('auth');
};

const storeAuthInfo = (authObj, dispatch) => {
    dispatch(setAuthToken(authObj.data));
    saveAuthToken('auth', authObj.data);
};

export const login = loginInfo => dispatch => {
    let userName = loginInfo.UserNameLogin || loginInfo.UserNameSignUp;
    let password = loginInfo.PasswordLogin || loginInfo.PasswordSignUp;
    return axios.post(`${config.BaseURL}/auth/login`, {
        username: userName,
        password: password
    })
        .then(obj => {
            console.log('login Success');
            dispatch(setLoggedIn(true));
            storeAuthInfo(obj, dispatch);
            return;
        })
        .catch(error => Promise.reject(new SubmissionError({_error: 'Login Failed, Please Check your Credentials'})))
};
