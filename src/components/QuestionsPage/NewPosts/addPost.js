'use strict';

import React from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import textArea from '../../reusableForm/textArea';
import {set_show_add_post_form, addPosts} from "../../../action/ama";
import {SelectDDMenu} from "../../reusableForm/selectField";
import validate from '../../../validation';
import {connect} from 'react-redux';

function AddPostForm(props) {

    // let postTitleStyle = {
    //     marginLeft: '2.7%',
    //     width: '40%',
    //     padding: '10px',
    //     overflowY: 'scroll',
    //     height: '20px',
    // };

    // let postBodyStyle = {
    //     marginLeft: '2%',
    //     width: '40%',
    //     padding: '10px',
    //     overflowY: 'scroll',
    //     height: '120px',
    //     whiteSpace: 'pre-wrap',
    // };

    // let addpostform ={
    //     textAlign : 'left',
    //     marginTop: '5%',
    // };

    function handleOnSubmit(formValue) {
        let categoryArr = formValue.CategoryDropDown.split('-');
        let createPostObj;
        if (categoryArr.length > 0) {
            createPostObj = {
                postTitle: formValue.PostTitle,
                postBody: formValue.PostBody,
                categoryId: categoryArr[1],
                categoryName: categoryArr[0],
                userId: props.userId,
                likeCount : 0,
                userName: props.userName
            }
        }
        return props.dispatch(addPosts(createPostObj))
            .then(() => props.dispatch(reset('AddPost')))
            .then(() => props.dispatch(set_show_add_post_form(null)));
    }

    function handleCancel() {
        return props.dispatch(set_show_add_post_form(null));
    }

    return (
        <section className="Add-Post-Form-Section">
            <form onSubmit={props.handleSubmit(handleOnSubmit)}>
                <Field labeltitle="Add-Post-Post-Title" name="PostTitle" class="Add-Post-Form-Section-Post-Title" placeholderValue="Add Post Title" id="Post-Title" component={textArea}/>
                <Field labeltitle="Add-Post-Post-Title" name="PostBody" class="Add-Post-Form-Section-Post-Body" placeholderValue="Add Post Body" id="Post-Body" component={textArea}/>
                <Field name="CategoryDropDown" id="category-drop-down" generatelist={props.categories} filter={'All'}
                       component={SelectDDMenu}/>
                <button type="submit" disabled={props.submitting}>+ CreatePost</button>
                <button type="button" onClick={handleCancel} disabled={props.submitting}>Cancel</button>
            </form>
        </section>
    );
}

const AddPost = reduxForm({
    form: 'AddPost',
    validate
})(AddPostForm);

const mapstateToProps = state => ({
    categories: state.ama.categories,
    userId: state.auth.userInfo.user.userId,
    userName: state.auth.userInfo.user.username
});

export default connect(mapstateToProps)(AddPost)
