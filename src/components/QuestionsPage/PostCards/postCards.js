import React from 'react';
import {connect} from 'react-redux';
import {PostCardHeader} from './postCardHeader';
import {PostCardData} from './postCardData';
import {getPosts, clear_post_list, no_more_post_cards, reset_skip_count} from "../../../action/ama";

var skip = 10;

export class PostCards extends React.Component {
    constructor() {
        super();
    }

    handleSkipCount() {
        if(this.props.resetSkipCount){
            skip=10;
            this.props.dispatch(reset_skip_count(false))
        }
        const limit = 10;
        this.props.dispatch(getPosts(this.props.categoryName.split('-')[1], skip));
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
        if ((window.innerHeight + Math.ceil(window.scrollY)) - document.body.scrollHeight > 15 && this.props.posts.length && !this.props.loadMoreData) {
            this.handleSkipCount();
        }
    }


    componentDidMount() {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
        return Promise.resolve(this.props.dispatch(clear_post_list()))
            .then(() => this.props.dispatch(reset_skip_count(true)))
    }


    render() {
        return (
            <aside className="postCards">
                <ul>
                    {this.props.posts.map((postData, index) =>
                        <li className="postCardsLists" key={index}
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
});

export default connect(mapStateToProps)(PostCards)
