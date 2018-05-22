'use strict';

import React from 'react';
import editImg from '../../../dist/images/EditIcon.png';
import {findAncestor, findpreviousSibling, findnextSibling} from '../../util/domTraversal';


export const EditComment = props => {

    let validateVisible = {
        display: props.userId === props.comment.userId ? 'inline' : 'none'
    };

    // TODO could refactor this
    function handleEditCommentBody(event) {
        event.preventDefault();
        let editWrapper = findAncestor(event.currentTarget, 'Edit-Comment-Wrapper');
        let cancelWrapper = findnextSibling(editWrapper, 'Cancel-Edit-Comment-Wrapper');
        let commentFooter = findAncestor(event.currentTarget, 'Comment-Card-Footer');
        let CommentBodyDiv = findpreviousSibling(commentFooter, 'Comment-Body-Div');
        let CommentBodyText = CommentBodyDiv.firstChild.innerHTML;
        CommentBodyDiv.lastChild.firstChild.value = CommentBodyText;
        CommentBodyDiv.firstChild.classList.add('remove-display');
        CommentBodyDiv.lastChild.classList.remove('remove-display');
        editWrapper.setAttribute('style' , 'display:none');
        cancelWrapper.classList.remove('remove-display');
        findnextSibling(editWrapper, 'Save-Comment-Wrapper').setAttribute('style' , 'display:inline');
        return;
    }

    return (
        <span style={validateVisible} className="Edit-Comment-Wrapper">
          <a href="#" className="Edit-Comment-Link" onClick={handleEditCommentBody}>
                <img className="Edit-Comment-Image" src={editImg} alt="Edit image is missing"/>
                <span className="Edit-Comment-Wrapper-text">edit</span>
            </a>
      </span>
    )
};
