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
                <AddComment userName={this.props.userName} dispatch={this.props.dispatch} EnableCommentSubmit={this.props.enableCommentSubmit}/>
                <Comments commentsList={this.props.commentsList}/>
            </section>
        );
    }
}


const mapStateToProps = state => ({
    commentsList: state.ama.comments,
    userName : state.auth.userInfo.user.username,
    enableCommentSubmit: state.ama.enableCommentSubmitButton,
});

export default connect(mapStateToProps)(CommentsLandingPage);
