import React from 'react';
import {connect} from 'react-redux';
import {getCategories, getPosts, clear_post_list} from "../../action/ama";
import {Link} from 'react-router-dom';

export class Categories extends React.Component {

    constructor() {
        super();
        this.categoryHandleClick = this.categoryHandleClick.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.postsHandleClick = this.postsHandleClick.bind(this);
    }

    getPosts(categoryId) {
        return Promise.resolve(this.props.dispatch(clear_post_list()))
            .then(() => this.props.dispatch(getPosts(categoryId)));
    }

    postsHandleClick(event) {
        console.log(event.currentTarget);
    }

    categoryHandleClick(event) {
        let categoryId;
        // ASk if text content is okay in this area as it would return its text and
        // all its decendants text. Check if this is appropriate.
        if (event.currentTarget.textContent === 'All') {
            categoryId = null;
            return this.getPosts(categoryId);
        } else {
            categoryId = event.currentTarget.dataset.categoryid;
            return this.getPosts(categoryId);
        }
    }

    componentDidMount() {
        return this.props.dispatch(getCategories());
    }

    render() {
        return (
            <aside className="CategoriesBar">
                <ul className="CategoryList">
                    {this.props.categories.map(category =>
                        <li key={category._id}
                            className={`category${category.name}`}
                            data-categoryid={category._id}
                            onClick={this.categoryHandleClick}>
                            {category.name}
                        </li>
                    )}
                </ul>
                <ul>
                    {this.props.posts.map(postData =>
                        <li key={postData._id}
                            onClick={this.postsHandleClick}
                            data-post-id={postData._id}>{postData.post}
                        </li>
                    )}
                </ul>
            </aside>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.ama.categories,
    posts: state.ama.posts,
});

export default connect(mapStateToProps)(Categories)

