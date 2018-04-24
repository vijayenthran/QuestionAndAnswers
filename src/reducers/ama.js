'use strict';

import {
    SET_CATEGORIES_LIST
} from '../action/ama'

const initialState = {
    categories: [],
};

export default function reducer(state = initialState, action) {
    // console.log('I am action');
    // console.log(action);
    if (action.type === SET_CATEGORIES_LIST) {
        return Object.assign({}, state, {
            categories : state.categories.concat(action.categories)
        })
    }
    return state;
}
