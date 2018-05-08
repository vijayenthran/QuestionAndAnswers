'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Comments} from './comments';
import {AddComment} from "./addYourComment";

export class CommentsLandingPage extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <section className="Comments-Section-Detail-Post-Page">
                <AddComment postId={this.props.postId} userId={this.props.userId} userName={this.props.userName}
                            dispatch={this.props.dispatch} EnableCommentSubmit={this.props.enableCommentSubmit} postObj={this.props.postObj}/>
                <Comments commentsList={this.props.commentsList}/>
            </section>
        );
    }
}


const mapStateToProps = state => ({
    commentsList: state.ama.comments,
    userName: state.auth.userInfo.user.username,
    userId: state.auth.userInfo.user.userId,
    postId: state.ama.singlePost._id,
    postObj: state.ama.singlePost,
    enableCommentSubmit: state.ama.enableCommentSubmitButton,
});

export default connect(mapStateToProps)(CommentsLandingPage);
