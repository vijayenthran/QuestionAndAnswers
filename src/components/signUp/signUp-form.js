'use strict';

import React from 'react';
import {Field, reduxForm} from 'redux-form';
import input from '../reusableForm/inputField';
import validate from '../../validation';
import {registerUser} from '../../action/users';
import {login} from '../../action/auth';
import {Link} from 'react-router-dom';

// TODO Understand how this.props gets its value in the onSubmit method
// export class SignUp extends React.Component {
export function SignUp(props) {
    function onsubmit(values) {
        /*On Submit is just like the render function which is attached to the prototype Object
          So When the SignUp component is being instantiated by react.
          It creates the this.props object and the redux form decorator attaches some useful methods that we can use  To that Object
          And thats how we get access to all the methods.*/
        return props.dispatch(registerUser(values)).then(() => props.dispatch(login(values)));
    }

    /*Inside the Render Function we are using the Bind Function Because we need to get the context of this
      then the onsubmit method above is being called within the handle submit method of the redux form
      See the following Video https://www.youtube.com/watch?v=ey7H8h4ERHg&t=1102s
      Or see the docs https://redux-form.com/7.3.0/docs/api/props.md/#-code-handlesubmit-eventorsubmit-function-code-
      ----
      The Errors is Obtained from Form .errors
      */
    return (
        <section className="SignUp-Section">
            <h2 className="SignUp-Section-Heading">SignUp</h2>
            <form className="SignUp-Form" onSubmit={props.handleSubmit(onsubmit)}>
                <section className="SignUpFormError">
                    {props.error && <strong>{props.error}</strong>}
                </section>
                <Field name="FirstNameSignUp" id="FirstName" type="text" component={input}/>
                <Field name="LastNameSignUp" id="LastName" type="text" component={input}/>
                <Field name="UserNameSignUp" id="UserName" type="text" component={input}/>
                <Field name="PasswordSignUp" id="Password" type="password" component={input}/>
                <div className="SignUp-Form-Footer">
                    <button className="SignUp-btn" type="submit" disabled={props.submitting}>SignUp</button>
                    <Link className="Navigate-Back-To-LoginPage" to="/">Back to loginPage</Link>
                </div>
            </form>
        </section>

    )
}

export default reduxForm({
    form: 'SignUp',
    validate
})(SignUp);
