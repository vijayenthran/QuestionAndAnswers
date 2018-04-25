import React from 'react';
import {connect} from 'react-redux';
import {getCategories, getPosts} from "../../action/ama"

export class Categories extends React.Component {

    constructor() {
        super();
        this.categoryHandleClick = this.categoryHandleClick.bind(this);
        this.getPosts = this.getPosts.bind(this);
    }

    getPosts(categoryId) {
        return this.props.dispatch(getPosts(categoryId))
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
                    {this.props.categories
                        .map(category =>
                            <li key={category._id} className={`category${category.name}`} data-categoryid={category._id}
                                onClick={this.categoryHandleClick}>{category.name}
                            </li>)}
                </ul>
                <div>{this.props.posts.map(postData => postData.post)}</div>
            </aside>
        )
    }
}

// export const Categories = props => {
//     console.log('I am props');
//     console.log(props);
//     function constructCategories() {
//         return props.dispatch(getCategories());
//     }
//
//     // constructCategories();
//
//     return (
//         <section className="CategoriesBar">
//         </section>
//     )
// };

const mapStateToProps = state => ({
    categories: state.ama.categories,
    posts: state.ama.posts,
});

export default connect(mapStateToProps)(Categories)

