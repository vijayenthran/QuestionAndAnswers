'use strict';

import React from 'react';
import {getPostsFilter, set_filter, clear_post_list, reset_skip_count} from "../../action/ama";

const NavElements = props => {

    function handleFilter(event){
        event.preventDefault();
        props.dispatch(clear_post_list());
        props.dispatch(reset_skip_count(true));
        props.dispatch(set_filter(event.currentTarget.dataset.filter));
        props.dispatch(getPostsFilter(event.currentTarget.dataset.filter, 0));
        return;
    }

    return  (
        <a href="#" className={`${'Link'-props.name} Link SliderMenu-Link`} data-filter={props.name} onClick={handleFilter}>{props.name}</a>
    )
};

export default NavElements;
