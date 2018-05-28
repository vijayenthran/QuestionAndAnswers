'use strict';

import React from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import textArea from '../../reusableForm/textArea';
import {set_show_add_post_form, addPosts, set_success_notification_message} from "../../../action/ama";
import {SelectDDMenu} from "../../reusableForm/selectField";
import validate from '../../../validation';
import {connect} from 'react-redux';

function AddPostForm(props) {

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
        return props.dispatch(addPosts(createPostObj, props.categoryName.split('-')[0]))
            .then(() => props.dispatch(set_success_notification_message(`added Post to ${formValue.CategoryDropDown.split('-')[0]} Category`)))
            .then(() => props.dispatch(reset('AddPost')))
            .then(() => props.dispatch(set_show_add_post_form(null)));
    }

    function handleFormSubmitButtonDisabled(submittingValue) {
        if(submittingValue === true){
            let submitBtnElement= document.getElementsByClassName('Create-Post-Submit-btn');
            let cancelBtnElement= document.getElementsByClassName('Cancel-Create-Post-Submit-btn');
            submitBtnElement[0].classList.add('disabled-btn');
            cancelBtnElement[0].classList.add('disabled-btn');
        }
        return;
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
                <div className="Submit-Cancel-Add-Posts-Form-btns">
                    <button className="Create-Post-Submit-btn" type="submit" disabled={handleFormSubmitButtonDisabled(props.submitting)}>CREATE POST</button>
                    <button className="Cancel-Create-Post-Submit-btn" type="button" onClick={handleCancel} disabled={props.submitting}>CANCEL</button>
                </div>
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
    userName: state.auth.userInfo.user.username,
    categoryName: state.ama.categorySelected,
});

export default connect(mapstateToProps)(AddPost)
