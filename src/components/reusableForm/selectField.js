'use strict';
import React from 'react';


export function SelectDDMenu(props) {
    function generateOptions() {
        if(props.filter){
            return props.generatelist.filter(elem => elem.name !== `${props.filter}`).map(elem => <option value={elem.name}>{elem.name}</option>)
        }
        return props.generatelist.map(elem => <option value={elem._id}>{elem.name}</option>)
    }

    return (
        <div className="category-drop-down-div">
            <select className="category-drop-down" {...props.input}>
                <option value=''>Select Category</option>
                {generateOptions()}
            </select>
        </div>
    );
}
