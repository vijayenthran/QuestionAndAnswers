'use strict';

import React from 'react';
import {Field, reduxForm} from 'redux-form';
import validate from '../../validation';
import input from '../reusableForm/inputField';
import {login} from '../../action/auth'

// TODO Understand Form Submit in detail. The dispatch is async because of the redux thunk Middleware
export function LoginForm(props) {
    function onsubmit(values) {
        return props.dispatch(login(values));
    }

    return (
        <form onSubmit={props.handleSubmit(onsubmit)}>
            <section className="LoginFromError">
                {props.error && <strong>{props.error}</strong>}
            </section>
            <Field name="UserNameLogin" id="UserName" type="text" component={input}/>
            <Field name="PasswordLogin" id="Password" type="password" component={input}/>
            <button type="submit" disabled={props.submitting}>Login</button>
        </form>
    )
}

export default reduxForm({
    form: 'Login',
    validate
})(LoginForm);
