'use strict';

import {
    SET_CATEGORIES_LIST,
    SET_POSTS_LIST,
    CLEAR_POST_LIST,
    CLEAR_CATEGORIES_LIST,
    SET_SINGLE_POST,
    CLEAR_SINGLE_POST,
    SET_COMMENTS_LIST,
    CLEAR_COMMENTS_LIST
} from '../action/ama';

const initialState = {
    categories: [],
    posts: [],
    singlePost: [],
    comments : []
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
        return Object.assign({}, state, {
            posts: state.posts.concat(action.posts)
        });
    }
    if (action.type === CLEAR_POST_LIST) {
        return Object.assign({}, state, {
            posts: []
        });
    }
    if (action.type === SET_SINGLE_POST) {
        return Object.assign({}, state, {
            singlePost: state.singlePost.concat(action.singlePost)
        });
    }
    if (action.type === CLEAR_SINGLE_POST) {
        return Object.assign({}, state, {
            singlePost: []
        });
    }
    if (action.type === SET_COMMENTS_LIST) {
        return Object.assign({}, state, {
            comments: state.comments.concat(action.comments)
        });
    }
    if (action.type === CLEAR_COMMENTS_LIST) {
        return Object.assign({}, state, {
            comments: []
        });
    }
    return state;
}
