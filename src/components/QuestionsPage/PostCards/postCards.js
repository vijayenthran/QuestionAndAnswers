'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {PostCardHeader} from './postCardHeader';
import {PostCardData} from './postCardData';
import {
    getPosts,
    clear_post_list,
    no_more_post_cards,
    reset_skip_count,
    set_category_selected,
    getPostsFilter
} from "../../../action/ama";
import '../../Styles/PostCardsStyles.scss';

var skip = 10;

export class PostCards extends React.Component {
    constructor() {
        super();
        this.onScroll = this.onScroll.bind(this);
    }

    handleSkipCount() {
        if (this.props.resetSkipCount) {
            skip = 10;
            this.props.dispatch(reset_skip_count(false))
        }
        const limit = 10;
        if (this.props.postsFilter) {
            this.props.dispatch(getPostsFilter(this.props.postsFilter, skip))
        } else {
            this.props.dispatch(getPosts(this.props.categoryName.split('-')[1], skip));
        }
        window.scrollTo(0, document.body.scrollHeight - 500);
        skip += limit;
        return;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.posts.length !== 0 &&
            this.props.length !== 0 &&
            newProps.posts.length - this.props.posts.length === 0 &&
            this.props.resetSkipCount === newProps.resetSkipCount &&
            this.props.categoryName === newProps.categoryName) {
            this.props.dispatch(no_more_post_cards(true));
        } else {
            this.props.dispatch(no_more_post_cards(false));
        }
    }


    onScroll() {
        if ((window.innerHeight + Math.ceil(window.scrollY)) - document.body.scrollHeight >= 0 && this.props.posts.length && !this.props.loadMoreData) {
            this.handleSkipCount();
        }
    }


    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
        this.props.dispatch(clear_post_list());
        this.props.dispatch(reset_skip_count(true));
        this.props.dispatch(set_category_selected(`All-null`));
        return;
    }


    render() {
        return (
            <aside className="postCards">
                <ul className="postCards-List-Enclose">
                    {this.props.posts.map((postData, index) =>
                        <li className="postCardsLists" key={postData._id}
                            data-post-id={postData._id}>
                            <div className="postCard">
                                <PostCardHeader postData={postData}/>
                                <PostCardData postData={postData} dispatch={this.props.dispatch}
                                              userId={this.props.userId}/>
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
    loadMoreData: state.ama.loadMoreData,
    categoryName: state.ama.categorySelected,
    resetSkipCount: state.ama.resetSkipCount,
    postsFilter: state.ama.postsFilter,
});

export default connect(mapStateToProps)(PostCards)
