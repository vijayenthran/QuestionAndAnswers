'use strict';

import axios from 'axios';
import {getAuthToken} from '../localStorage';
import config from '../../config/default';

export const SET_CATEGORIES_LIST = 'SET_CATEGORIES_LIST';
export const set_categories_list = categoryList => ({
    type: SET_CATEGORIES_LIST,
    categories: categoryList.categories,
});


export const getCategories = () => dispatch => {
    let authToken = getAuthToken('auth');
    if (authToken) {
        return axios({
            method: 'get',
            url: `${config.BaseURL}/app/categories`,
            headers: {authorization: `bearer ${authToken}`}
        }).then(categoriesObj => {
            dispatch(set_categories_list({categories:categoriesObj.data}));
            return;
        }).catch(error => console.log(error))
    } else {
        return;
    }
};
