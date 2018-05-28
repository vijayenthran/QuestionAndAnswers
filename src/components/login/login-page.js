'use strict';

import React from 'react';
import LoginFrom from "./login-form";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import HeaderBar from "../Header/headerBar";
import {FooterBar} from "../Footer/footerBar";
import {Welcome} from "./learnMore";
import {AboutQues} from "./AboutQue's";


export function LoginPage(props) {
    if (props.loginStatus) {
        return <Redirect to="/app"/>;
    }
    return (
        <div className="loginArea-Wrapper">
            <div className="loginArea">
                <HeaderBar/>
                <div className="Login-Area-Info">
                    <Welcome/>
                    <LoginFrom/>
                </div>
            </div>
            <AboutQues/>
            <FooterBar/>
        </div>

    );
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(LoginPage)
