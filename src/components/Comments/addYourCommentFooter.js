'use strict';

import React from 'react';
import {findAncestor, findpreviousSibling} from "../../util/domTraversal";

export const AddYourCommentFooter = props => {
    
    let styleVisibility = {
        pointerEvents : props.EnableCommentSubmit ? 'auto' : 'none',
    };

    function handleAddCommentSubmit(event) {
        event.preventDefault();
        let commentFooter = findAncestor(event.currentTarget, 'Add-Comment-Footer');
        let textAreaText = findpreviousSibling(commentFooter, 'Add-Comments-Body').firstChild.value;
        console.log('I am gettinmg executed');
        return;
    }

    return (
        <div style={styleVisibility} className="Add-Comment-Footer">
            <button onClick={handleAddCommentSubmit}>Submit</button>
        </div>
    );
}
