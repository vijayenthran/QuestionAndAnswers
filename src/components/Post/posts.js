'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {getSinglePost, clear_single_post} from '../../action/ama';

export class PostComponent extends React.Component {
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

    render() {
        return (
            <div>
                <h2>I am the post</h2>
                <div><i>{this.props.post.map(elem => elem.postBody)}</i></div>
                <h2>I am the comments</h2>
                <div>
                    <ul>
                        {this.props.commentsList.map(elem => <li key={elem._id}>{elem.comment}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    post: state.ama.singlePost,
    commentsList: state.ama.comments
});

export default connect(mapStateToProps)(PostComponent)
