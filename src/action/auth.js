'use strict';

import {SubmissionError} from 'redux-form'
import config from '../../config/default';
import axios from 'axios';
import {saveAuthToken, clearAuthToken, getAuthToken} from '../localStorage';
import jwtDecode from 'jwt-decode';

const authToken = getAuthToken('auth');
let userInfo;


export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const setLoggedIn = loggedInValue => ({
    type: SET_LOGGED_IN,
    loggedIn: loggedInValue.loggedIn,
    userInfo: loggedInValue.userInfo,
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});


export const logOut = value => dispatch => {
    dispatch(setLoggedIn({userInfo: value.userInfo, loggedIn: value.loggedIn}));
    dispatch(clearAuth());
    clearAuthToken('auth');
    return;
};

const storeAuthInfo = (authObj, dispatch) => {
    dispatch(setAuthToken(authObj.data));
    saveAuthToken('auth', authObj.data);
    return;
};

// This Function is used to refresh the auth Token once in every two hour
setInterval(function () {
    const authToken = getAuthToken('auth');
    if (authToken) {
        return axios({
            method: 'POST',
            url: `${config.BaseURL}/auth/refresh`,
            headers: {authorization: `bearer ${authToken}`}
        }).then(authObj => {
            saveAuthToken('auth', authObj.data);
            return;
        });
    }
    else {
        return;
    }
}, 1000*60*2);

export const login = loginInfo => dispatch => {
    // need to decode the User Info because we need the user id to be stores in the posts collection(database) and comments collection(database)
    // In future If we need to filter out the posts specific to a user or comments specific to a user . It would be helpful
    // Putting it here because it is need only in this particular block no where else

    if (authToken) {
        userInfo = jwtDecode(authToken);
    } else {
        userInfo = null;
    }
    let userName = loginInfo.UserNameLogin || loginInfo.UserNameSignUp;
    let password = loginInfo.PasswordLogin || loginInfo.PasswordSignUp;
    return axios.post(`${config.BaseURL}/auth/login`, {
        username: userName,
        password: password
    })
        .then(obj => {
            console.log('login Success');
            dispatch(setLoggedIn({userInfo: userInfo, loggedIn: true}));
            storeAuthInfo(obj, dispatch);
            return;
        })
        .catch(error => Promise.reject(new SubmissionError({_error: 'Login Failed, Please Check your Credentials'})))
};
