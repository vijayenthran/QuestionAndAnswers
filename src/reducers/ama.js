'use strict';

import {
    SET_CATEGORIES_LIST,
    SET_POSTS_LIST,
    CLEAR_POST_LIST,
    CLEAR_CATEGORIES_LIST,
    SET_SINGLE_POST,
    CLEAR_SINGLE_POST,
    SET_COMMENTS_LIST,
    CLEAR_COMMENTS_LIST,
    SET_SHOW_ADD_POST_FORM,
    SET_SHOW_DELETE_POST,
    SET_POST_DELETED_DETAIL_POST_PAGE,
    CLEAR_POST_DELETED_DETAIL_POST_PAGE,
    ENABLE_POST_COMMENT_SUBMIT_BUTTON
} from '../action/ama';

const initialState = {
    categories: [],
    posts: [],
    singlePost: null,
    comments: [],
    showAddPost: null,
    showDeletePosts: null,
    postdeleteddetailpostpage:null,
    enableCommentSubmitButton : null,
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_CATEGORIES_LIST) {
        return Object.assign({}, state, {
            categories: state.categories.concat(action.categories)
        });
    }
    if (action.type === CLEAR_CATEGORIES_LIST) {
        return Object.assign({}, state, {
            categories: []
        });
    }
    if (action.type === SET_POSTS_LIST) {
        if (Array.isArray(action.posts)) {
            return Object.assign({}, state, {
                posts: state.posts.concat(action.posts)
            });
        } else {
            return Object.assign({}, state, {
                posts: [action.posts, ...state.posts]
            });
        }
    }
    if (action.type === CLEAR_POST_LIST) {
        return Object.assign({}, state, {
            posts: []
        });
    }
    if (action.type === SET_SINGLE_POST) {
        return Object.assign({}, state, {
            // singlePost: state.singlePost.concat(action.singlePost);
            singlePost: action.singlePost,
        });
    }
    if (action.type === CLEAR_SINGLE_POST) {
        return Object.assign({}, state, {
            singlePost: null
        });
    }
    if (action.type === SET_COMMENTS_LIST) {
        if (Array.isArray(action.comments)) {
            return Object.assign({}, state, {
                comments: state.comments.concat(action.comments)
            });
        } else {
            return Object.assign({}, state, {
                comments: [action.comments, ...state.comments]
            });
        }
        // return Object.assign({}, state, {
        //     comments: state.comments.concat(action.comments)
        // });
    }
    if (action.type === CLEAR_COMMENTS_LIST) {
        return Object.assign({}, state, {
            comments: []
        });
    }
    if (action.type === SET_SHOW_ADD_POST_FORM) {
        return Object.assign({}, state, {
            showAddPost: action.showAddPost
        });
    }
    if (action.type === SET_SHOW_DELETE_POST) {
        return Object.assign({}, state, {
            showDeletePosts: action.showDeletePosts
        });
    }
    if (action.type === SET_POST_DELETED_DETAIL_POST_PAGE) {
        return Object.assign({}, state, {
            postdeleteddetailpostpage: action.postdeleteddetailpostpage
        });
    }
    if (action.type === CLEAR_POST_DELETED_DETAIL_POST_PAGE) {
        return Object.assign({}, state, {
            postdeleteddetailpostpage: null
        });
    }
    if (action.type === ENABLE_POST_COMMENT_SUBMIT_BUTTON) {
        return Object.assign({}, state, {
            enableCommentSubmitButton: action.enableCommentSubmitButton
        });
    }
    return state;
}
