'use strict';

import {
    SET_CATEGORIES_LIST,
    SET_POSTS_LIST,
    CLEAR_POST_LIST
} from '../action/ama';

const initialState = {
    categories: [],
    posts:[]
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_CATEGORIES_LIST) {
        return Object.assign({}, state, {
            categories : state.categories.concat(action.categories)
        });
    }
    if (action.type === SET_POSTS_LIST) {
        return Object.assign({}, state, {
            posts : state.posts.concat(action.posts)
        });
    }
    if (action.type === CLEAR_POST_LIST) {
        return Object.assign({}, state, {
            posts : []
        });
    }
    return state;
}
