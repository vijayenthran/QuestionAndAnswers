import React from 'react';
import HeaderBar from '../headerBar'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';

export function QuestionLandingPage(props) {
    if(!props.loggedIn){
        return <Redirect to="/" />;
    }
    return (
        <section className="App-page">
            <HeaderBar />
            <div>Successful Login Showing Landing Page</div>
        </section>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(QuestionLandingPage)
