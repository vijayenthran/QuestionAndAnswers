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

export const SET_FILTER = 'SET_FILTER';
export const set_filter = value => ({
    type: SET_FILTER,
    postsFilter: value
});

export const SET_LOADER_TEXT = 'SET_LOADER_TEXT';
export const set_loader_text = value => ({
    type: SET_LOADER_TEXT,
    loaderText: value
});

export const SET_SHIMMER = 'SET_SHIMMER';
export const set_shimmer = value => ({
    type: SET_SHIMMER,
    shimmer: value
});

export const SET_SHOW_SLIDER_MENU = 'SET_SHOW_SLIDER_MENU';
export const set_show_slider_menu = value => ({
    type: SET_SHOW_SLIDER_MENU,
    sliderMenuVisibility: value
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

export const SET_FILTER_POST_FROM_POST_LIST = 'SET_FILTER_POST_FROM_POST_LIST';
export const set_filter_post_list = postId => ({
    type: SET_FILTER_POST_FROM_POST_LIST,
    filterPostId: postId
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

export const SET_SHOW_DELETE_CONFIRMATION_POPUP = 'SET_SHOW_DELETE_CONFIRMATION_POPUP';
export const show_delete_Confirmation_PopUp = value => ({
    type: SET_SHOW_DELETE_CONFIRMATION_POPUP,
    showDeleteConfirmationPopUp: value
});

export const SET_DELETE_CALL_FROM_VALUE = 'SET_DELETE_CALL_FROM_VALUE';
export const set_delete_call_from = value => ({
    type: SET_DELETE_CALL_FROM_VALUE,
    deleteCallFrom: value
});

export const SET_DELETE_POST_ID_Value = 'SET_DELETE_POST_ID_Value';
export const set_delete_post_id_value = value => ({
    type: SET_DELETE_POST_ID_Value,
    deletePostId: value
});

export const SET_DELETE_COMMENT_ID_Value = 'SET_DELETE_COMMENT_ID_Value';
export const set_delete_comment_id_value = value => ({
    type: SET_DELETE_COMMENT_ID_Value,
    deleteCommentId: value
});

export const SET_MODIFIED_POST_OBJ_FOR_DELETE_COMMENT = 'SET_MODIFIED_POST_OBJ_FOR_DELETE_COMMENT';
export const set_delete_post_Obj_for_delete_comment = value => ({
    type: SET_MODIFIED_POST_OBJ_FOR_DELETE_COMMENT,
    modifiedPostObj: value
});

export const SET_ROUTE_PATH = 'SET_ROUTE_PATH';
export const set_route_path = value => ({
    type: SET_ROUTE_PATH,
    routePath: value
});

export const SET_SUCCESS_NOTIFICATION = 'SET_SUCCESS_NOTIFICATION';
export const set_success_notification = value => ({
    type: SET_SUCCESS_NOTIFICATION,
    successNotification: value
});

export const SET_SUCCESS_NOTIFICATION_MESSAGE = 'SET_SUCCESS_NOTIFICATION_MESSAGE';
export const set_success_notification_message = value => ({
    type: SET_SUCCESS_NOTIFICATION_MESSAGE,
    successNotificationMessage: value
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
                dispatch(clear_categories_list());
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
        }).then(() => {
            dispatch(set_filter_post_list(postId));
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
        }).catch(error => console.log(error));
    } else {
        return;
    }
};

// This action is used to get a post based on its object id
export const getSinglePost = postId => dispatch => {
    let authToken = getAuthToken('auth');
    dispatch(set_shimmer(true));
    return axios({
        method: 'get',
        url: `${config.BaseURL}/app/posts/post/${postId}`,
        headers: {authorization: `bearer ${authToken}`}
    }).then(postObj => {
        dispatch(clear_comment_list());
        dispatch(set_comment_list({comments: postObj.data.commentsList}));
        dispatch(set_single_post({singlePost: postObj.data}));
        dispatch(set_shimmer(false));
    }).catch(error => console.log(error));
};

export const updatePosts = (postId, putObj) => dispatch => {
    let authToken = getAuthToken('auth');
    return axios({
        method: 'put',
        url: `${config.BaseURL}/app/posts/${postId}`,
        headers: {authorization: `bearer ${authToken}`},
        data: {...putObj}
    }).then(() =>{
        dispatch(set_success_notification(true));
        removeNotification(dispatch);
    }).catch(error => console.log(error));
};

export const updateComment = (commentId, updatedObj) => dispatch => {
    let authToken = getAuthToken('auth');
    return axios({
        method: 'put',
        url: `${config.BaseURL}/app/comments/${commentId}`,
        headers: {authorization: `bearer ${authToken}`},
        data: {...updatedObj}
    }).then(() =>{
        dispatch(set_success_notification(true));
        removeNotification(dispatch);
    }).catch(error => console.log(error));
};


export const addPosts = (createPostObj, categoryName) => dispatch => {
    let appendListItemBool;
    if (categoryName === 'All' || categoryName === createPostObj.categoryName) {
        appendListItemBool = true;
    }
    let authToken = getAuthToken('auth');
    return axios({
        method: 'post',
        url: `${config.BaseURL}/app/posts`,
        headers: {authorization: `bearer ${authToken}`},
        data: {...createPostObj}
    })
        .then(createPostObj => {
            dispatch(set_success_notification(true));
            removeNotification(dispatch);
            if (appendListItemBool === true) {
                dispatch(set_posts_list({posts: createPostObj.data}));
                return;
            }
            return;
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
            dispatch(set_success_notification(true));
            removeNotification(dispatch);
            let cleansedpostObj = postObjectCleanser(postObj, createCommentsObj.data._id);
            dispatch(set_comment_list({comments: createCommentsObj.data}));
            return axios({
                method: 'put',
                url: `${config.BaseURL}/app/posts/${postId}`,
                headers: {authorization: `bearer ${authToken}`},
                data: {...cleansedpostObj}
            });
        }).catch(err => console.log(err));
};


// This action is used to get all the posts based on the category id
export const getPostsFilter = (filter, skipLimit) => dispatch => {
    let authToken = getAuthToken('auth');
    dispatch(set_shimmer(true));
    return axios({
        method: 'get',
        url: `${config.BaseURL}/app/posts/filter?filter=${filter}&&skiplimit=${skipLimit}`,
        headers: {authorization: `bearer ${authToken}`}
    }).then(postsObj => {
        // check if post Object contains an array of items returned
        // if no items are returned then just simply return without calling the dispatch action
        // My be When there are no items show that there is no content there. add that in the else block
        // if (postsObj.data.length >= 0) {
        //     dispatch(set_posts_list({posts: postsObj.data}));
        //     return;
        // }
        if (postsObj && postsObj.data.length >= 0) {
            if (filter === 'HOT') {
                postsObj.data.sort((a, b) => b.commentsList.length - a.commentsList.length)
            }
            dispatch(set_posts_list({posts: postsObj.data}));
            dispatch(set_shimmer(false));
            dispatch(set_loader_text(false));
            return;
        } else {
            dispatch(set_shimmer(false));
            dispatch(set_loader_text(false));
            return;
        }
    }).catch(error => console.log(error));
};

// This action is used to get all the posts based on the category id
export const getPosts = (categoryId, skipLimit) => dispatch => {
    let authToken = getAuthToken('auth');
    dispatch(set_shimmer(true));
    return axios({
        method: 'get',
        url: `${config.BaseURL}/app/posts/${categoryId}?skiplimit=${skipLimit}`,
        headers: {authorization: `bearer ${authToken}`}
    }).then(postsObj => {
        // check if post Object contains an array of items returned
        // if no items are returned then just simply return without calling the dispatch action
        // My be When there are no items show that there is no content there. add that in the else block
        if (postsObj && postsObj.data.length >= 0) {
            dispatch(set_posts_list({posts: postsObj.data}));
            dispatch(set_shimmer(false));
            dispatch(set_loader_text(false));
            return;
        } else {
            return;
        }
    }).catch(error => console.log(error));
};

// Understand Function Currying.
export const deleteDetailPostHelper = (value, postId, commentId, modifiedPostObj) => dispatch => {
    return Promise.resolve(dispatch(set_post_deleted_detail_post_page(value)))
        .then(() => dispatch(clear_post_deleted_detail_post_page(null)))
        .then(() => deletepost(postId)(dispatch))
        .then(() => deletecommentsWithPostId(postId)(dispatch));
};


function removeNotification(dispatch) {
    setTimeout(function () {
        dispatch(set_success_notification(null));
        dispatch(set_success_notification_message(''));
    }, 4000)
}

export const deleteNotificationWrapper = (deleteValueFrom, postId, commentId, modifiedPostObj, posts) => dispatch => {
    if (deleteValueFrom && deleteValueFrom === 'AppPage' && postId && !commentId && !modifiedPostObj) {
        dispatch(deletepost(postId));
        dispatch(deletecommentsWithPostId(postId));
        removeNotification(dispatch);
        return;
    } else if (deleteValueFrom && deleteValueFrom === 'DetailPostPage' && postId && !commentId && !modifiedPostObj) {
        dispatch(deleteDetailPostHelper(true, postId));
        removeNotification(dispatch);
        return;
    } else if (deleteValueFrom && deleteValueFrom === 'DeleteSingleComment' && postId && commentId && modifiedPostObj) {
        dispatch(deleteSingleComment(commentId, postId, modifiedPostObj));
        removeNotification(dispatch);
        return;
    } else {
        return;
    }

};
