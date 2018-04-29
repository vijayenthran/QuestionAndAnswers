import React from 'react';
import {connect} from 'react-redux';
import {getCategories, getPosts, clear_post_list, clear_categories_list} from "../../action/ama";

export class Categories extends React.Component {

    constructor() {
        super();
        this.categoryHandleClick = this.categoryHandleClick.bind(this);
        this.getPosts = this.getPosts.bind(this);
    }

    // get posts when the category link is clicked
    getPosts(categoryId) {
        return Promise.resolve(this.props.dispatch(clear_post_list()))
            .then(() => this.props.dispatch(getPosts(categoryId)));
    }

    // on click callback when the category link is clicked
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
        return Promise.resolve(this.props.dispatch(clear_categories_list()))
            .then(() => this.props.dispatch(getCategories()));
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
            </aside>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.ama.categories
});

export default connect(mapStateToProps)(Categories)

