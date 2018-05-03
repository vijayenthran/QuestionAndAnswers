'use strict';

import React from 'react';
import HeaderBar from '../headerBar'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import CategorySection from './categories';
import PostCardsSection from './PostCards/postCards';
import NewPost from './NewPosts/landingpage';

export function QuestionLandingPage(props) {

    let questionpagecontent = {
        width : '99%'
    };

    let questionPageBodyStyle = {
      marginLeft:'auto',
      marginRight:'auto',
    };

    let addnewpostdiv ={
        textAlign: 'right',
    };

    let postcardssection ={
        display : 'inline-block',
        width : '75%'
    };


    if (!props.loginStatus) {
        return <Redirect to="/"/>;
    }
    return (
        <section style={questionpagecontent} className="question-page-content">
            <HeaderBar/>
            <div style={questionPageBodyStyle} className="question-page-body">
                <div style={postcardssection} className="posts-section">
                    <div style={addnewpostdiv} className="add-new-post-div"><NewPost/></div>
                    <PostCardsSection className="post-cards-section"/>
                </div>
                <CategorySection  className="category-section"/>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(QuestionLandingPage)
