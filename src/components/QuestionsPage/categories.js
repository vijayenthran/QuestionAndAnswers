'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {
    getCategories,
    getPosts,
    clear_post_list,
    clear_categories_list,
    set_category_selected,
    reset_skip_count,
    set_filter
} from "../../action/ama";
import '../Styles/categoriesStyles.scss';
import {findpreviousSibling} from "../../util/domTraversal";

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
            .then(() => this.props.dispatch(set_filter(null)))
            .then(() => this.props.dispatch(set_category_selected(`${categoryName}-${categoryId}`)))
            .then(() => this.props.dispatch(getPosts(categoryId, 0)));
    }

    // on click callback when the category link is clicked
    categoryHandleClick(event) {
        let categoryId;
        let total = document.getElementsByClassName('SelectedCategory');
        if (findpreviousSibling(event.currentTarget, 'SelectedCategory')) {
            findpreviousSibling(event.currentTarget, 'SelectedCategory').classList.remove('SelectedCategory');
        }
        for (let item of total) {
            item.classList.remove('SelectedCategory');
        }
        event.currentTarget.classList.add('SelectedCategory');
        let selectedCategory = event.currentTarget.classList[0];
        let element1 = document.getElementsByClassName(selectedCategory);
        for (let item of element1) {
            if ([...item.classList].indexOf('SelectedCategory') < 0) {
                item.classList.add('SelectedCategory');
            }
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
        this.props.dispatch(getCategories());
    }

    render() {
        return (
            <aside className="SliderMenu-Categories">
                <h2 className="Category-Section-Header">Categories</h2>
                <ul className="CategoryList">
                    {this.props.categories.map((category, index) => {
                            if (category.name === this.props.categorySelected.split('-')[0] && !this.props.sliderMenuVisibility) {
                                return (
                                    <li key={index}
                                        className={`category${category.name} category SelectedCategory`}
                                        data-categoryid={category._id}
                                        onClick={this.categoryHandleClick}>
                                        {category.name}
                                    </li>
                                )
                            } else if (category.name === this.props.categorySelected.split('-')[0] && this.props.sliderMenuVisibility) {
                                return (
                                    <li key={index}
                                        className={`category${category.name} category SelectedCategory`}
                                        data-categoryid={category._id}
                                        onClick={this.categoryHandleClick}>
                                        {category.name}
                                    </li>
                                )
                            }
                            return (
                                <li key={index}
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
    categorySelected: state.ama.categorySelected,
    sliderMenuVisibility: state.ama.sliderMenuVisibility
});

export default connect(mapStateToProps)(Categories)

