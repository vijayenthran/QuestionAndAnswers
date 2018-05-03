'use strict';
import React from 'react';


export function SelectDDMenu(props) {
    // Make sure the name and the id are present in the value attribute
    // for the select because that is what gets passed when the form is submitted.
    function generateOptions() {
        if(props.filter){
            return props.generatelist.filter(elem => elem.name !== `${props.filter}`).map(elem => <option value={`${elem.name}-${elem._id}`}>{elem.name}</option>)
        }
        return props.generatelist.map(elem => <option value={`${elem.name}-${elem._id}`}>{elem.name}</option>)
    }

    return (
        <div className="category-drop-down-div">
            <select className="category-drop-down" {...props.input}>
                <option value=''>Select Category</option>
                {generateOptions()}
            </select>
            {props.meta.error && props.meta.touched ? <span>{props.meta.error}</span> : null}
        </div>
    );
}
