import React from 'react';
import HeaderBar from '../headerBar';
import PostandCommentsComponent from './postsandComments';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

export const PostsLandingPage = (props) => {
    if (!props.loginStatus) {
        return <Redirect to="/"/>;
    }

    return (
        <section className="PostLandingPage">
            <HeaderBar/>
            <PostandCommentsComponent history={props.history} match={props.match}/>
        </section>
    )
};


const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(PostsLandingPage)
