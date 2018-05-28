import React from 'react';
import SignUpForm from "./signUp-form";
import SignUpTitle from "./signUp-Title";

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import HeaderBar from "../Header/headerBar";
import {FooterBar} from "../Footer/footerBar";

export function SignUpPage(props) {
    if (props.loginStatus) {
        return <Redirect to="/app"/>;
    }
    return (
        <section className="Signup-landingPage">
            <div className="signup-Page">
                <HeaderBar/>
                <SignUpTitle/>
                <SignUpForm/>
            </div>
            <FooterBar/>
        </section>
    );
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(SignUpPage)
