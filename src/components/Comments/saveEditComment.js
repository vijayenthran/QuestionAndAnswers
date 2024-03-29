'use strict';

import React from 'react';
import {findAncestor, findpreviousSibling, findnextSibling} from '../../util/domTraversal';
import {updateComment, set_success_notification_message} from '../../action/ama';

export const SaveComment = props => {

    // TODO could refactor this
    function handleSaveComment (event) {
        event.preventDefault();
        props.dispatch(set_success_notification_message(`saved edited Comment`));
        let saveWrapper = findAncestor(event.currentTarget, 'Save-Comment-Wrapper');
        let canceEdit = findnextSibling(saveWrapper, 'Cancel-Edit-Comment-Wrapper');
        let commentId = findAncestor(saveWrapper, 'Comment-Card').dataset.commentId;
        let editWrapper = findpreviousSibling(saveWrapper, 'Edit-Comment-Wrapper');
        let commentFooter = findAncestor(event.currentTarget, 'Comment-Card-Footer');
        let commentBodyUpdated = findpreviousSibling(commentFooter, 'Comment-Body-Div').lastChild.firstChild.value;
        findpreviousSibling(commentFooter, 'Comment-Body-Div').firstChild.innerHTML=commentBodyUpdated;
        findpreviousSibling(commentFooter, 'Comment-Body-Div').firstChild.classList.remove('remove-display');
        findpreviousSibling(commentFooter, 'Comment-Body-Div').lastChild.classList.add('remove-display');
        saveWrapper.setAttribute('style' , 'display:none');
        editWrapper.setAttribute('style' , 'display:inline');
        canceEdit.classList.add('remove-display');
        let commentsObj = Object.assign({}, props.comment);
        delete commentsObj._id;
        commentsObj['comment'] = commentBodyUpdated;
        props.dispatch(updateComment(commentId, commentsObj));
        return;
    }

    return (
        <span className="Save-Comment-Wrapper">
          <a className="Save-Comment-Wrapper-text" href="#" onClick={handleSaveComment}>save</a>
        </span>
    )
};
