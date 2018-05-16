import React from 'react';
import NavElements from './navLinks';
import '../Styles/headerNavStyles.scss';

export const HeaderNav = () => {

    return (
        <nav className="HeaderNavLinks">
            <NavElements name={"HOT"}/>
            <NavElements name={"TOP"}/>
            <NavElements name={"NEW"}/>
        </nav>
    )
};
