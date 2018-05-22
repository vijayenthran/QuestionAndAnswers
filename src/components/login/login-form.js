'use strict';

import React from 'react';
import {Field, reduxForm} from 'redux-form';
import validate from '../../validation';
import input from '../reusableForm/inputField';
import {login} from '../../action/auth'
import '../Styles/LoginForm.scss';
import {Link} from 'react-router-dom';

// TODO Understand Form Submit in detail. The dispatch is async because of the redux thunk Middleware
export function LoginForm(props) {
    function onsubmit(values) {
        return props.dispatch(login(values));
    }

    return (
        <section className="LoginSection">
            <div className="SignUp-Information-text">Have an Account? Please Sign In. Else,click signUp to create one..</div>
            <form  className="Login-Form" onSubmit={props.handleSubmit(onsubmit)}>
                <div className="LoginFromError">
                    {props.error && <strong>{props.error}</strong>}
                </div>
                 <Field name="UserNameLogin" id="Username" type="text" component={input}/>
                 <Field name="PasswordLogin" id="Password" type="password" component={input}/>
                 <button className="Login-Button" type="submit" disabled={props.submitting}>Login</button>
                 <Link className="Create-Account-Link" to="/signUp">SignUp</Link>
            </form>
        </section>
    )
}

export default reduxForm({
    form: 'Login',
    validate
})(LoginForm);
