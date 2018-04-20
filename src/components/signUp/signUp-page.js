import React from 'react';
import SignUpForm from "./signUp-form";
import SignUpTitle from "./signUp-Title";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import HeaderBar from "../headerBar";
import {FooterBar} from "../footerBar";

export function SignUpPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/app"/>;
    }
    return (
        <section className="landingPage">
            <HeaderBar/>
            <SignUpTitle/>
            <SignUpForm/>
            <Link to="/">Login</Link>
            <FooterBar/>
        </section>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(SignUpPage)
