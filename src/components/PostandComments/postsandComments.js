'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {getSinglePost, clear_single_post, set_route_path} from '../../action/ama';
import CommentsLandingPage from "../Comments/landingpage";
import {Post} from "./post";
import '../Styles/postAndComments.scss';


export class PostandCommentsComponent extends React.Component {
    constructor() {
        super();

    }

    componentDidMount() {
        let postId = this.props.match.params.postId;
        if (postId) {
            return Promise.resolve(this.props.dispatch(clear_single_post()))
                .then(() => this.props.dispatch(getSinglePost(postId)))
                .then(() => this.props.dispatch(set_route_path(this.props.location)))
        } else {
            return;
        }
    }

    render() {
        if (this.props.post !== null) {
            return (
                <section className="Detail-Post-Page">
                    <Post commentLength={this.props.commentLength} post={this.props.post} dispatch={this.props.dispatch}
                          userId={this.props.userId} postdeleteddetailpostpage={this.props.postdeleteddetailpostpage}/>
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
    userId: state.auth.userInfo.user.userId,
    postdeleteddetailpostpage: state.ama.postdeleteddetailpostpage,
    commentLength: state.ama.comments.length,
});

export default connect(mapStateToProps)(PostandCommentsComponent)
