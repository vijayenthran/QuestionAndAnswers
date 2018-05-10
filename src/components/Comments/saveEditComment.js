'use strict';

import React from 'react';
import {findAncestor, findpreviousSibling, findnextSibling} from '../../util/domTraversal';
import {updateComment} from '../../action/ama';

export const SaveComment = props => {

    let noDisplay = {
        display: 'none',
    };

    let verticalAlign = {
        verticalAlign: 'top',
        marginLeft: '1%'
    };

    // TODO could refactor this
    function handleSaveComment (event) {
        event.preventDefault();
        let saveWrapper = findAncestor(event.currentTarget, 'Save-Commment-Wrapper');
        let commentId = findAncestor(saveWrapper, 'Comment-Card').dataset.commentId;
        let editWrapper = findpreviousSibling(saveWrapper, 'Edit-Comment-Wrapper');
        let commentFooter = findAncestor(event.currentTarget, 'Comment-Card-Footer');
        let commentBody = findpreviousSibling(commentFooter, 'Comment-Card-Body');
        commentBody.contentEditable = 'false';
        saveWrapper.setAttribute('style' , 'display:none');
        editWrapper.setAttribute('style' , 'display:inline');
        let commentsObj = Object.assign({}, props.comment);
        delete commentsObj._id;
        commentsObj['comment'] = commentBody.innerHTML;
        props.dispatch(updateComment(commentId, commentsObj));
        return;
    }

    return (
        <span style={noDisplay} className="Save-Commment-Wrapper">
          <a style={verticalAlign} href="#" onClick={handleSaveComment}>save</a>
        </span>
    )
};
