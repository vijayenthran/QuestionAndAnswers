import React from 'react';
import {connect} from 'react-redux';
import {getCategories} from "../../action/ama"


// Need to call React Life Cycle method which cannot be achieved with the class syntax.
export const Categories = props => {
    console.log('I am props');
    console.log(props);
    // function constructCategories() {
    //     return props.dispatch(getCategories());
    // }
    //
    // constructCategories();

    return (
        <section className="CategoriesBar">
        </section>
    )
};

const mapStateToProps = state => ({
    ama: state.ama
});

export default connect(mapStateToProps)(Categories)

