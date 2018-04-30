'use strict';

import React from 'react';
import {Field, reduxForm} from 'redux-form';
import input from '../../reusableForm/inputField';
import {set_show_add_post_form} from "../../../action/ama";
import {SelectDDMenu} from "../../reusableForm/selectField";
import {connect} from 'react-redux';

function AddPostForm(props) {
    function handleOnSubmit(values) {
        console.log(values);
    }

    function handleCancel() {
        return props.dispatch(set_show_add_post_form(null));
    }

    return (
        <section className="AddPostForm">
            <form onSubmit={props.handleSubmit(handleOnSubmit)}>
                <Field name="PostTitle" id="post-title" type="text" component={input}/>
                <Field name="PostBody" id="post-body" type="text" component={input}/>
                <Field name="CategoryDropDown" id="category-drop-down" generatelist={props.categories} filter={'All'} component={SelectDDMenu}/>
                <button type="submit" disabled={props.submitting}>+ CreatePost</button>
                <button type="button" onClick={handleCancel} disabled={props.submitting}>Cancel</button>
            </form>
        </section>
    );
}

const AddPost = reduxForm({
    form: 'AddPost'
})(AddPostForm);

const mapstateToProps = state => ({
   categories : state.ama.categories
});

export default connect(mapstateToProps)(AddPost)
