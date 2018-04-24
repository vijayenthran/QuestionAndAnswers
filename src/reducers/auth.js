'use strict';

import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    SET_LOGGED_IN
} from '../action/auth'

const initialState = {
    authToken: null, // authToken !== null does not mean it has been validated
    loading: false,
    loggedIn: null,
    error: null,
    userInfo: null
};

export default function reducer(state = initialState, action) {
    if (action.type === CLEAR_AUTH) {
        return Object.assign({}, state, {
            authToken: null
        });
    }
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    }
    if (action.type === SET_LOGGED_IN) {
        return Object.assign({}, state, {
            loggedIn: action.loggedIn,
            userInfo: action.userInfo
        });
    }
    return state;
}
