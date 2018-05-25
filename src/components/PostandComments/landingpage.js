'use strict';

import React from 'react';
import HeaderBar from '../headerBar';
import PostandCommentsComponent from './postsandComments';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Shimmer from '../Shimmer';

export const PostsLandingPage = (props) => {
    if (!props.loginStatus) {
        return <Redirect to="/"/>;
    }

    return (
        <section className="PostLandingPage">
            <HeaderBar position={`postCommentsPage`}/>
            <div className="shimmer-div">
                <Shimmer/>
                <Shimmer/>
                <Shimmer/>
                <Shimmer/>
                <Shimmer/>
                <Shimmer/>
            </div>
            <PostandCommentsComponent history={props.history} match={props.match}/>
        </section>
    )
};


const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(PostsLandingPage)
