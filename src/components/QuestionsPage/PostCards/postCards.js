import React from 'react';
import {connect} from 'react-redux';
import {PostCardHeader} from './postCardHeader';
import {PostCardData} from './postCardData';
import {getPosts, clear_post_list} from "../../../action/ama";

export class PostCards extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        return Promise.resolve(this.props.dispatch(clear_post_list()))
            .then(() => this.props.dispatch(getPosts(null)));
    }

    render() {
        return (
            <aside className="postCards">
                <ul>
                    {this.props.posts.map(postData =>
                        <li className="postCardsLists" key={postData._id}
                            data-post-id={postData._id}>
                            <div className="postCard">
                                <PostCardHeader postData={postData}/>
                                <PostCardData postData={postData} dispatch={this.props.dispatch} userId={this.props.userId}/>
                            </div>
                        </li>
                    )}
                </ul>
            </aside>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.ama.posts,
    userId: state.auth.userInfo.user.userId,

});

export default connect(mapStateToProps)(PostCards)
