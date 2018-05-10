'use strict';

import React from 'react';
import editImg from '../../../dist/images/EditIcon.png';
import {findAncestor, findpreviousSibling, findnextSibling} from '../../util/domTraversal';


export const EditComment = props => {

    let validateVisible = {
        display: props.userId === props.comment.userId ? 'inline' : 'none'
    };

    let imgStyle2 = {
        width: '22px',
        size: 'auto',
    };

    let verticalAlign = {
        verticalAlign: 'top',
    };

    // TODO could refactor this
    function handleEditCommentBody(event) {
        event.preventDefault();
        let editWrapper = findAncestor(event.currentTarget, 'Edit-Comment-Wrapper');
        let commentFooter = findAncestor(event.currentTarget, 'Comment-Card-Footer');
        let commentBody = findpreviousSibling(commentFooter, 'Comment-Card-Body');
        editWrapper.setAttribute('style' , 'display:none');
        findnextSibling(editWrapper, 'Save-Commment-Wrapper').setAttribute('style' , 'display:inline');
        commentBody.contentEditable = 'true';
        return;
    }

    return (
        <span style={validateVisible} className="Edit-Comment-Wrapper">
          <a href="#" className="Edit-Wrapper" onClick={handleEditCommentBody}>
                <img style={imgStyle2} src={editImg} alt="Edit image is missing"/>
                <span style={verticalAlign} className="Edit-Wrapper-text">edit</span>
            </a>
      </span>
    )
};
