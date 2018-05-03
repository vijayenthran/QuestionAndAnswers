import React from 'react';

const NavElements = props => {
    let navstyle = {
        marginLeft: '5%',
    };

    function handleFilter(event){
        event.preventDefault();
        console.log(event.currentTarget.dataset.filter);
        return;
    }
    return  (
        <a href="#" style={navstyle} data-filter={props.name} onClick={handleFilter}>{props.name}</a>
    )
};

export default NavElements;
