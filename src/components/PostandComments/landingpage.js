'use strict';

import React from 'react';
import HeaderBar from '../Header/headerBar';
import PostandCommentsComponent from './postsandComments';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Shimmer from '../Shimmer/Shimmer';
import DeleteConfirmation from "../Notification/DeleteConfirmation";
import SuccessConfirmation from "../Notification/SuccessConfirmation";

export const PostsLandingPage = props => {
    if (!props.loginStatus) {
        return <Redirect to="/"/>;
    }
    return (
        <section className="PostLandingPage">
            <HeaderBar position={`postCommentsPage`}/>
            <DeleteConfirmation location={props.location} />
            <SuccessConfirmation/>
            <div className="shimmer-div">
                <Shimmer/>
                <Shimmer/>
                <Shimmer/>
                <Shimmer/>
                <Shimmer/>
                <Shimmer/>
            </div>
            <PostandCommentsComponent location={props.location} history={props.history} match={props.match}/>
        </section>
    )
};


const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(PostsLandingPage)
