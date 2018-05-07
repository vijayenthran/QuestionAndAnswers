'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {getSinglePost, clear_single_post} from '../../action/ama';
import {Comments} from "../Comments/comments";
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
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.post !== null) {
            console.log('I am here');
            return true;
        }
        return false;
    }

    render() {
        console.log(this.props.post);
        console.log('I am being called');
        if (this.props.post !== null) {
            return (
                <section className="Detail-Post-Page">
                    <Post post={this.props.post} dispatch={this.props.dispatch} userId={this.props.userId} postdeleteddetailpostpage={this.props.postdeleteddetailpostpage}/>
                    <h2>I am the comments</h2>
                    <Comments commentsList={this.props.commentsList}/>
                </section>
            )
        } else {
            return null;
        }
    }
}


const mapStateToProps = state => ({
    post: state.ama.singlePost,
    commentsList: state.ama.comments,
    userId :state.auth.userInfo.user.userId,
    postdeleteddetailpostpage : state.ama.postdeleteddetailpostpage
});

export default connect(mapStateToProps)(PostandCommentsComponent)
