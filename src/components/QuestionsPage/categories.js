'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {
    getCategories,
    getPosts,
    clear_post_list,
    clear_categories_list,
    set_category_selected,
    reset_skip_count
} from "../../action/ama";
import '../Styles/categoriesStyles.scss';

export class Categories extends React.Component {


    constructor() {
        super();
        this.categoryHandleClick = this.categoryHandleClick.bind(this);
        this.getPosts = this.getPosts.bind(this);
    }

    // get posts when the category link is clicked
    getPosts(categoryId, categoryName) {
        return Promise.resolve(this.props.dispatch(clear_post_list()))
            .then(() => this.props.dispatch(reset_skip_count(true)))
            .then(() => this.props.dispatch(set_category_selected(`${categoryName}-${categoryId}`)))
            .then(() => this.props.dispatch(getPosts(categoryId, 0)));
    }

    // on click callback when the category link is clicked
    categoryHandleClick(event) {
        let categoryId;
        let currentSelectedElement = document.getElementsByClassName('SelectedCategory')[0];
        if (currentSelectedElement.innerHTML !== event.currentTarget.innerHTML) {
            currentSelectedElement.classList.remove('SelectedCategory');
            event.currentTarget.classList.add('SelectedCategory');
        }
        // ASk if text content is okay in this area as it would return its text and
        // all its decendants text. Check if this is appropriate.
        let categoryName = event.currentTarget.textContent;
        if (categoryName === 'All') {
            categoryId = null;
            return this.getPosts(categoryId, categoryName);
        } else {
            categoryId = event.currentTarget.dataset.categoryid;
            return this.getPosts(categoryId, categoryName);
        }
    }

    componentDidMount() {
        return Promise.resolve(this.props.dispatch(clear_categories_list()))
            .then(() => this.props.dispatch(getCategories()));
    }

    render() {
        return (
            <aside className="Category-Section">
                <h2 className="Category-Section-Header">Categories</h2>
                <ul className="CategoryList">
                    {this.props.categories.map(category => {
                            if (category.name === 'All') {
                                return (
                                    <li key={category._id}
                                        className={`category${category.name} category SelectedCategory`}
                                        data-categoryid={category._id}
                                        onClick={this.categoryHandleClick}>
                                        {category.name}
                                    </li>
                                )
                            }
                            return (
                                <li key={category._id}
                                    className={`category${category.name} category`}
                                    data-categoryid={category._id}
                                    onClick={this.categoryHandleClick}>
                                    {category.name}
                                </li>
                            );
                        }
                    )}
                </ul>
            </aside>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.ama.categories,
    categoryName: state.ama.categorySelected,
});

export default connect(mapStateToProps)(Categories)

