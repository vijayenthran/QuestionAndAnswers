'use strict';
import {findAncestor, findpreviousSibling} from '../../util/domTraversal';

import React from 'react';

export const CancelEditCommentText = props => {

    function handleCancelEditComment(event){
        event.preventDefault();
        let cancelWrapper = findAncestor(event.currentTarget, 'Cancel-Edit-Comment-Wrapper');
        let saveWrapper = findpreviousSibling(cancelWrapper, 'Save-Comment-Wrapper');
        let editWrapper = findpreviousSibling(cancelWrapper, 'Edit-Comment-Wrapper');
        let commentCardfooter = findAncestor(cancelWrapper, 'Comment-Card-Footer');
        let commentBody = findpreviousSibling(commentCardfooter, 'Comment-Card-Body');
        console.log(commentBody);
        commentBody.contentEditable = 'false';
        cancelWrapper.classList.add('remove-display');
        saveWrapper.setAttribute('style' , 'display:none');
        editWrapper.setAttribute('style' , 'display:inline');
    }

    return (
        <span className="Cancel-Edit-Comment-Wrapper remove-display">
          <a className="Cancel-Edit-Comment-Wrapper-Text" href="#" onClick={handleCancelEditComment}>cancel</a>
        </span>
    )
};
