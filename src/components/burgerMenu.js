'use strict';

import React from 'react';
import {set_show_slider_menu} from "../action/ama";


export const BurgerMenu = props => {

    function handleBurgerMenuClick(event){
        props.dispatch(set_show_slider_menu(true));
        return;
    }

    return(
        <div className="Burger-icon" onClick={handleBurgerMenuClick}>
            <svg className="Burger-icon-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <title>menu</title>
                <path d="M4 12h56v12h-56zM4 28h56v12h-56zM4 44h56v12h-56z"></path>
            </svg>
        </div>

    )
};
