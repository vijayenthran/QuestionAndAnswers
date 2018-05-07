'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {getSinglePost, clear_single_post} from '../../action/ama';
import CommentsLandingPage from "../Comments/landingpage";
import {Post} from "./post";

export class PostandCommentsComponent extends React.Component {
    constructor() {
        super();

    }

    componentDidMount() {
        let postId = this.props.match.params.postId;
        if (postId) {
            return Promise.resolve(this.props.dispatch(clear_single_post()))
                .then(() => this.props.dispatch(getSinglePost(postId)));
        } else {
            return;
        }
    }

    // Check if I really want Should component update. Render function is being called multiple times in react.
    // Understand why.
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('I am being called 1');
    //     console.log('############');
    //     console.log(nextProps);
    //     console.log('############');
    //     console.log(nextState);
    //     // if (nextProps.post !== null) {
    //     //     console.log('I am here');
    //     //     return true;
    //     // }
    //     // return false;
    // }

    render() {
        if (this.props.post !== null) {
            return (
                <section className="Detail-Post-Page">
                    <Post post={this.props.post} dispatch={this.props.dispatch} userId={this.props.userId} postdeleteddetailpostpage={this.props.postdeleteddetailpostpage}/>
                    <h2>I am the comments</h2>
                    <CommentsLandingPage/>
                </section>
            )
        } else {
            return null;
        }
    }
}


const mapStateToProps = state => ({
    post: state.ama.singlePost,
    userId :state.auth.userInfo.user.userId,
    postdeleteddetailpostpage : state.ama.postdeleteddetailpostpage
});

export default connect(mapStateToProps)(PostandCommentsComponent)
