'use strict';

import axios from 'axios';
import {getAuthToken} from '../localStorage';
import config from '../../config/default';

export const SET_CATEGORIES_LIST = 'SET_CATEGORIES_LIST';
export const set_categories_list = categoryList => ({
    type: SET_CATEGORIES_LIST,
    categories: categoryList.categories,
});

export const SET_POSTS_LIST = 'SET_POSTS_LIST';
export const set_posts_list = postList => ({
    type: SET_POSTS_LIST,
    posts: postList.posts,
});


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
        }).catch(error => console.log(error))
    } else {
        return;
    }
};

// If the categoryId is passed then get the posts related to that categoryId
// Else get all the posts of all category.
export const getPosts = categoryId => dispatch => {
    let authToken = getAuthToken('auth');
    if (authToken && categoryId) {
        return axios({
            method: 'get',
            url: `${config.BaseURL}/app/posts/${categoryId}`,
            headers: {authorization: `bearer ${authToken}`}
        }).then(postsObj => {
            dispatch(set_posts_list(postsObj.data));
            return;
        }).catch(error => console.log(error))
    } else if (authToken && !categoryId) {
        return axios({
            method: 'get',
            url: `${config.BaseURL}/app/posts/all`,
            headers: {authorization: `bearer ${authToken}`}
        }).then(postsObj => {
            console.log('I am post object');
            console.log(postsObj);
            dispatch(set_posts_list({posts: postsObj.data}));
            return;
        }).catch(error => console.log(error))
    } else {
        return;
    }
};
