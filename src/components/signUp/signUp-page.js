import React from 'react';
import SignUpForm from "./signUp-form";
import SignUpTitle from "./signUp-Title";

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import HeaderBar from "../headerBar";
import {FooterBar} from "../footerBar";

export function SignUpPage(props) {
    if (props.loginStatus) {
        return <Redirect to="/app"/>;
    }
    return (
        <section className="landingPage">
            <HeaderBar/>
            <SignUpTitle/>
            <SignUpForm/>
            <FooterBar/>
        </section>
    );
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(SignUpPage)
