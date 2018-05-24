'use strict';

import React from 'react';
import {logOut} from '../action/auth';

export const LogOutLink = props => {

    function logoutUser(event) {
        event.preventDefault();
        const logoutObj = {userInfo: null, loggedIn: false};
        props.dispatch(logOut(logoutObj));
        return;
    }

    return (
        <a href="#" className="Logout-btn SliderMenu-Logout-btn" onClick={logoutUser}>
            {'Logout'}
        </a>
    )
};
