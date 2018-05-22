'use strict';

import React from 'react';
import {logOut} from '../action/auth';
import {connect} from 'react-redux';
import {HeaderNav} from "./NavBar/headerNav";
import LoaderBar from './loaderBar/loaderBar';

import './Styles/headerBarStyles.scss';

export function HeaderBar(props) {
    function logoutUser(event) {
        event.preventDefault();
        const logoutObj = {userInfo: null, loggedIn: false};
        props.dispatch(logOut(logoutObj));
        return;
    }

    if (props.loginStatus && !props.position) {
        return (
            <section className="HeaderBar">
                <LoaderBar></LoaderBar>
                <div className="HeaderNav">
                    <HeaderNav dispatch={props.dispatch}/>
                </div>
                <div className="User-Info-Section-App-Page">
                    <span className="Welcome-text">
                        {`Hi ${props.userName}`}
                    </span>
                    <a href="#" className="Logout-btn" onClick={logoutUser}>
                        {'Logout'}
                    </a>
                </div>
            </section>
        )
    } else if (props.position && props.position === `postCommentsPage`) {
        return (
            <section className="HeaderBar">
                <div className="User-Info-Section-Comments-Page">
                    <span className="Welcome-text">
                        {`Hi ${props.userName}`}
                    </span>
                    <a href="#" className="Logout-btn" onClick={logoutUser}>
                        {'Logout'}
                    </a>
                </div>
            </section>
        )
    } else {
        return(
            <div className="HeaderBar">
                <div className="Logout-Header-Content">
                    <span >HeaderContent</span>
                </div>
            </div>
        )
    }
}

const manipulateUserInfo = state => {
    let userName;
    if (state.auth.userInfo !== null) {
        userName = state.auth.userInfo.user.username
    } else {
        userName = null;
    }
    return userName;
};

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn,
    userName: manipulateUserInfo(state)
});

export default connect(mapStateToProps)(HeaderBar);

