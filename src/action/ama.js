'use strict';

import axios from 'axios';
import {getAuthToken} from '../localStorage';
import config from '../../config/default';

// ----------------------------------------------------------------------------------------------------------------------------------
export const SET_CATEGORIES_LIST = 'SET_CATEGORIES_LIST';
export const set_categories_list = categoryList => ({
    type: SET_CATEGORIES_LIST,
    categories: categoryList.categories,
});

export const CLEAR_CATEGORIES_LIST = 'CLEAR_CATEGORIES_LIST';
export const clear_categories_list = () => ({
    type: CLEAR_CATEGORIES_LIST
});

export const SET_POSTS_LIST = 'SET_POSTS_LIST';
export const set_posts_list = postList => ({
    type: SET_POSTS_LIST,
    posts: postList.posts
});

export const CLEAR_POST_LIST = 'CLEAR_POST_LIST';
export const clear_post_list = () => ({
    type: CLEAR_POST_LIST,
});

export const SET_SINGLE_POST = 'SET_SINGLE_POST';
export const set_single_post = post => ({
    type: SET_SINGLE_POST,
    singlePost: post.singlePost
});

export const CLEAR_SINGLE_POST = 'CLEAR_SINGLE_POST';
export const clear_single_post = () => ({
    type: CLEAR_SINGLE_POST,
});

export const SET_COMMENTS_LIST = 'SET_COMMENTS_LIST';
export const set_comment_list = commentList => ({
    type: SET_COMMENTS_LIST,
    comments : commentList.comments
});

export const CLEAR_COMMENTS_LIST = 'CLEAR_COMMENTS_LIST';
export const clear_comment_list = () => ({
    type: CLEAR_COMMENTS_LIST
});

// ----------------------------------------------------------------------------------------------------------------------------------

// This action is used to get all the categories
export const getCategories = () => dispatch => {
    let authToken = getAuthToken('auth');
    if (authToken) {
        return axios({
            method: 'get',
            url: `${config.BaseURL}/app/categories`,
            headers: {authorization: `bearer ${authToken}`}
        }).then(categoriesObj => {
            dispatch(set_categories_list({categories: categoriesObj.data}));
            return;
        }).catch(error => console.log(error));
    } else {
        return;
    }
};

// This action is used to get Comments based on the postId
export const getComments = postId => dispatch => {
    let authToken = getAuthToken('auth');
    if (authToken) {
        return axios({
            method: 'get',
            url: `${config.BaseURL}/app/comments/${postId}`,
            headers: {authorization: `bearer ${authToken}`}
        }).then(commentsObj => {
            dispatch(set_comment_list({comments: commentsObj.data}));
            return;
        }).catch(error => console.log(error));
    } else {
        return;
    }
};



// This action is used to get a post based on its object id
export const getSinglePost = postId => dispatch => {
    let authToken = getAuthToken('auth');
    return axios({
        method: 'get',
        url: `${config.BaseURL}/app/posts/post/${postId}`,
        headers: {authorization: `bearer ${authToken}`}
    }).then(postObj => {
        dispatch(set_single_post({singlePost: postObj.data}));
    }).catch(error => console.log(error));
};


// This action is used to get all the posts based on the category id
export const getPosts = categoryId => dispatch => {
    let authToken = getAuthToken('auth');
    return axios({
        method: 'get',
        url: `${config.BaseURL}/app/posts/${categoryId}`,
        headers: {authorization: `bearer ${authToken}`}
    }).then(postsObj => {
        // check if post Object contains an array of items returned
        // if no items are returned then just simply return without calling the dispatch action
        // My be When there are no items show that there is no content there. add that in the else block
        if (postsObj.data.length >= 0) {
            dispatch(set_posts_list({posts: postsObj.data}));
            return;
        } else {
            return;
        }
    }).catch(error => console.log(error));
};
