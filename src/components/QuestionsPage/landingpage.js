'use strict';

import React from 'react';
import HeaderBar from '../headerBar'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import CategorySection from './categories';
import PostCardsSection from './PostCards/postCards';

export function QuestionLandingPage(props) {
    if (!props.loginStatus) {
        return <Redirect to="/"/>;
    }
    return (
        <section className="question-page-content">
            <HeaderBar/>
            <div>Successful Login Showing Landing Page</div>
            <CategorySection/>
            <PostCardsSection/>
        </section>
    )
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(QuestionLandingPage)
