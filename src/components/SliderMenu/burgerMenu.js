'use strict';

import React from 'react';
import {set_show_slider_menu} from "../../action/ama";
import {findnextSibling} from "../../util/domTraversal";

export const BurgerMenu = props => {

    function handleBurgerMenuClick(event) {
        props.dispatch(set_show_slider_menu(true));
        // event.currentTarget.classList.add('remove-display');
        // findnextSibling(event.currentTarget, 'Closed-Slider-Menu-Icon-Wrapper').classList.remove('remove-display');
        return;
    }
    if (!props.sliderMenuVisibility) {
        return (
            <div className="Burger-icon" onClick={handleBurgerMenuClick}>
                <svg className="Burger-icon-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                    <path d="M4 12h56v12h-56zM4 28h56v12h-56zM4 44h56v12h-56z"></path>
                </svg>
            </div>
        );
    }else{
        return null;
    }
};
