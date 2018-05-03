import React from 'react';
import NavElements from './navLinks';

export const HeaderNav = () => {

    return (
        <nav className="HeaderNavBar">
            <NavElements name={"HOT"}/>
            <NavElements name={"TOP"}/>
            <NavElements name={"NEW"}/>
        </nav>
    )
};
