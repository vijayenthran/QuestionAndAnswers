import React from 'react';
import LoginFrom from "./login-form";
import LoginTitle from "./login-title";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import HeaderBar from "../headerBar";
import {FooterBar} from "../footerBar";
import {Link} from 'react-router-dom';

export function LoginPage(props) {
    if (props.loginStatus) {
        return <Redirect to="/app"/>;
    }
    return (
        <section className="loginArea">
            <HeaderBar/>
            <LoginTitle/>
            <LoginFrom/>
            <Link to="/signUp">SignUp</Link>
            <FooterBar/>
        </section>
    );
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(LoginPage)
