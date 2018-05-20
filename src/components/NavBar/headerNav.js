'use strict';

import React from 'react';
import NavElements from './navLinks';
import '../Styles/headerNavStyles.scss';

export const HeaderNav = props => {

    return (
        <nav className="HeaderNavLinks">
            <NavElements dispatch={props.dispatch} name={"HOT"}/>
            <NavElements dispatch={props.dispatch} name={"TOP"}/>
            <NavElements dispatch={props.dispatch} name={"NEW"}/>
        </nav>
    )
};
