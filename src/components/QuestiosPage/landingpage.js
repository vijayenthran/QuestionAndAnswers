import React from 'react';
import HeaderBar from '../headerBar'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import CategorySection from './categories';

export function QuestionLandingPage(props) {
    if (!props.loginStatus) {
        return <Redirect to="/"/>;
    }
    return (
        <section className="App-page">
            <HeaderBar/>
            <div>Successful Login Showing Landing Page</div>
            <CategorySection />
        </section>
    )
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(QuestionLandingPage)
