'use strict';

import React from 'react';
import {findAncestor, findpreviousSibling, findnextSibling} from '../../util/domTraversal';
import {updateComment} from '../../action/ama';

export const SaveComment = props => {

    // TODO could refactor this
    function handleSaveComment (event) {
        event.preventDefault();
        let saveWrapper = findAncestor(event.currentTarget, 'Save-Comment-Wrapper');
        let canceEdit = findnextSibling(saveWrapper, 'Cancel-Edit-Comment-Wrapper');
        let commentId = findAncestor(saveWrapper, 'Comment-Card').dataset.commentId;
        let editWrapper = findpreviousSibling(saveWrapper, 'Edit-Comment-Wrapper');
        let commentFooter = findAncestor(event.currentTarget, 'Comment-Card-Footer');
        let commentBody = findpreviousSibling(commentFooter, 'Comment-Card-Body');
        commentBody.contentEditable = 'false';
        saveWrapper.setAttribute('style' , 'display:none');
        editWrapper.setAttribute('style' , 'display:inline');
        canceEdit.classList.add('remove-display');
        let commentsObj = Object.assign({}, props.comment);
        delete commentsObj._id;
        commentsObj['comment'] = commentBody.innerHTML;
        props.dispatch(updateComment(commentId, commentsObj));
        return;
    }

    return (
        <span className="Save-Comment-Wrapper">
          <a className="Save-Comment-Wrapper-text" href="#" onClick={handleSaveComment}>save</a>
        </span>
    )
};
