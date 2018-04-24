'use strict';


export const saveAuthToken = (key, authToken) => {
    try {
        return localStorage.setItem(key, authToken);
    } catch (e) {
    }
};

export const clearAuthToken = (key) => {
    try {
        return localStorage.removeItem(key);
    } catch (e) {
    }
};


export const getAuthToken = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (e) {
    }
};
