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

export const SET_FETCH_MORE_POSTCARDS = 'SET_FETCH_MORE_POSTCARDS';
export const fetch_more_post_cards = value => ({
    type: SET_FETCH_MORE_POSTCARDS,
    fetchMorePostCards: value
});

export const SET_CATEGORY_SELECTED = 'SET_CATEGORY_SELECTED';
export const set_category_selected = value => ({
    type: SET_CATEGORY_SELECTED,
    categorySelected: value
});

export const RESET_SKIP_COUNT = 'RESET_SKIP_COUNT';
export const reset_skip_count = value => ({
    type: RESET_SKIP_COUNT,
    resetSkipCount: value
});

export const SET_NO_MORE_POST_CARDS = 'SET_NO_MORE_POST_CARDS';
export const no_more_post_cards = value => ({
    type: SET_NO_MORE_POST_CARDS,
    loadMoreData: value
});

export const SET_POSTS_LIST = 'SET_POSTS_LIST';
export const set_posts_list = postList => ({
    type: SET_POSTS_LIST,
    posts: postList.posts
});

export const SET_SHOW_DELETE_POST = 'SET_SHOW_DELETE_POST';
export const set_show_delete_post = value => ({
    type: SET_SHOW_DELETE_POST,
    showDeletePosts: value
});

export const SET_SHOW_ADD_POST_FORM = 'SET_SHOW_ADD_POST_FORM';
export const set_show_add_post_form = val => ({
    type: SET_SHOW_ADD_POST_FORM,
    showAddPost: val
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
    comments: commentList.comments
});

export const FILTER_COMMENT_FROM_COMMENTS_LIST = 'FILTER_COMMENT_FROM_COMMENTS_LIST';
export const filter_comment_from_comment_list = filter => ({
    type: FILTER_COMMENT_FROM_COMMENTS_LIST,
    commentId: filter.commentId
});


export const CLEAR_COMMENTS_LIST = 'CLEAR_COMMENTS_LIST';
export const clear_comment_list = () => ({
    type: CLEAR_COMMENTS_LIST
});

export const SET_POST_DELETED_DETAIL_POST_PAGE = 'SET_POST_DELETED_DETAIL_POST_PAGE';
export const set_post_deleted_detail_post_page = value => ({
    type: SET_POST_DELETED_DETAIL_POST_PAGE,
    postdeleteddetailpostpage: value,
});

export const CLEAR_POST_DELETED_DETAIL_POST_PAGE = 'CLEAR_POST_DELETED_DETAIL_POST_PAGE';
export const clear_post_deleted_detail_post_page = value => ({
    type: CLEAR_POST_DELETED_DETAIL_POST_PAGE,
    postdeleteddetailpostpage: value,
});

export const ENABLE_POST_COMMENT_SUBMIT_BUTTON = 'ENABLE_POST_COMMENT_SUBMIT_BUTTON';
export const enable_post_comment_submit_button = value => ({
    type: ENABLE_POST_COMMENT_SUBMIT_BUTTON,
    enableCommentSubmitButton: value,
});


// ----------------------------------------------------------------------------------------------------------------------------------


// This action is used to get all the categories
export const getCategories = () => dispatch => {
    let authToken = getAuthToken('auth');
    if (authToken) {
        return Promise.resolve(fetch_more_post_cards(true))
            .then(() => axios({
                method: 'get',
                url: `${config.BaseURL}/app/categories`,
                headers: {authorization: `bearer ${authToken}`}
            }))
            .then(categoriesObj => {
                dispatch(set_categories_list({categories: categoriesObj.data}));
                dispatch(fetch_more_post_cards(false));
                return;
            }).catch(error => console.log(error));
    } else {
        return;
    }
};

// This action is used to delete post based on id
export const deletepost = postId => dispatch => {
    let authToken = getAuthToken('auth');
    if (authToken) {
        return axios({
            method: 'delete',
            url: `${config.BaseURL}/app/posts/${postId}`,
            headers: {authorization: `bearer ${authToken}`}
        }).then(deleteRes => {
            console.log(deleteRes);
            return;
        }).catch(error => console.log(error));
    } else {
        return;
    }
};

export const deleteSingleComment = (commentId, postId, putObj) => dispatch => {
    let authToken = getAuthToken('auth');
    if (authToken) {
        return axios({
            method: 'delete',
            url: `${config.BaseURL}/app/comments/?commentId=${commentId}`,
            headers: {authorization: `bearer ${authToken}`}
        }).then(() => {
            dispatch(filter_comment_from_comment_list({commentId: commentId}));
            return axios({
                method: 'put',
                url: `${config.BaseURL}/app/posts/${postId}`,
                headers: {authorization: `bearer ${authToken}`},
                data: {...putObj}
            });
        }).catch(error => console.log(error));
    } else {
        return;
    }
};


// This action is used to delete post based on id
export const deletecommentsWithPostId = postId => dispatch => {
    let authToken = getAuthToken('auth');
    if (authToken) {
        return axios({
            method: 'delete',
            url: `${config.BaseURL}/app/comments/?postId=${postId}`,
            headers: {authorization: `bearer ${authToken}`}
        }).then(deleteRes => {
            console.log(deleteRes);
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
        dispatch(clear_comment_list());
        dispatch(set_comment_list({comments: postObj.data.commentsList}));
        dispatch(set_single_post({singlePost: postObj.data}));
    }).catch(error => console.log(error));
};

export const updatePosts = (postId, putObj) => dispatch => {
    let authToken = getAuthToken('auth');
    return axios({
        method: 'put',
        url: `${config.BaseURL}/app/posts/${postId}`,
        headers: {authorization: `bearer ${authToken}`},
        data: {...putObj}
    }).catch(error => console.log(error));
};

export const updateComment = (commentId, updatedObj) => dispatch => {
    let authToken = getAuthToken('auth');
    return axios({
        method: 'put',
        url: `${config.BaseURL}/app/comments/${commentId}`,
        headers: {authorization: `bearer ${authToken}`},
        data: {...updatedObj}
    }).catch(error => console.log(error));
};


export const addPosts = createPostObj => dispatch => {
    let authToken = getAuthToken('auth');
    return axios({
        method: 'post',
        url: `${config.BaseURL}/app/posts`,
        headers: {authorization: `bearer ${authToken}`},
        data: {...createPostObj}
    })
        .then(createPostObj => {
            console.log('I am the server docs');
            console.log(createPostObj);
            dispatch(set_posts_list({posts: createPostObj.data}));
        })
        .catch(err => console.log(err));
};

const postObjectCleanser = (postObj, commentId) => {
    // TODO read more about Object mutation. Object .assign manipulates the reference object as well.
    // Check if there is a better way

    let modifyPostObj = Object.assign({}, postObj);
    delete modifyPostObj._id;
    let newCommentListArr = [];
    modifyPostObj.commentsList.map(elem => newCommentListArr.push(elem._id));
    newCommentListArr.push(commentId);
    modifyPostObj['commentsList'] = newCommentListArr;
    return modifyPostObj;
};

export const addComments = (createCommentsObj, postObj) => dispatch => {
    let postId = postObj._id;
    let authToken = getAuthToken('auth');
    return axios({
        method: 'post',
        url: `${config.BaseURL}/app/comments`,
        headers: {authorization: `bearer ${authToken}`},
        data: {...createCommentsObj}
    })
        .then(createCommentsObj => {
            let cleansedpostObj = postObjectCleanser(postObj, createCommentsObj.data._id);
            dispatch(set_comment_list({comments: createCommentsObj.data}));
            return axios({
                method: 'put',
                url: `${config.BaseURL}/app/posts/${postId}`,
                headers: {authorization: `bearer ${authToken}`},
                data: {...cleansedpostObj}
            });
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
};


// This action is used to get all the posts based on the category id
export const getPosts = (categoryId, skipLimit) => dispatch => {
    let authToken = getAuthToken('auth');
    return axios({
        method: 'get',
        url: `${config.BaseURL}/app/posts/${categoryId}?skiplimit=${skipLimit}`,
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

// Understand Function Currying.
export const deleteDetailPostHelper = (value, postId) => dispatch => {
    return Promise.resolve(dispatch(set_post_deleted_detail_post_page(value)))
        .then(() => dispatch(clear_post_deleted_detail_post_page(null)))
        .then(() => deletepost(postId)(dispatch))
        .then(() => deletecommentsWithPostId(postId)(dispatch));
};
