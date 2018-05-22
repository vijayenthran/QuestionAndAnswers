'use strict';

import React from 'react';
import {findnextSibling, findAncestor, findpreviousSibling} from "../../../util/domTraversal";

export const EditPostText = props => {

    function handlewriteDataintoTextArea(event, editPostSection){
        let postcardTitle = findpreviousSibling(editPostSection, 'Detail-Post-Page-Post-Title');
        let postcardTitleVal = postcardTitle.innerHTML;
        let postcardBody = findpreviousSibling(editPostSection, 'Detail-Post-Page-Post-Body');
        let postcardBodyVal = postcardBody.innerHTML;
        let editPostTitleTextArea = findpreviousSibling(editPostSection, 'edit-Post-title-div');
        let editPostBodyTextArea = findpreviousSibling(editPostSection, 'edit-Post-body-div');
        editPostTitleTextArea.firstChild.value = postcardTitleVal;
        editPostBodyTextArea.firstChild.value = postcardBodyVal;
        postcardTitle.classList.add('remove-display');
        postcardBody.classList.add('remove-display');
        editPostTitleTextArea.classList.remove('remove-display');
        editPostBodyTextArea.classList.remove('remove-display');
    }


    function handleEditPostText(event) {
        event.preventDefault();
        let editTextWrapper = findAncestor(event.currentTarget, 'Edit-Post-text-Wrapper');
        let ansEditPostPage = findAncestor(event.currentTarget, 'Detail-Post-Page-Edit-Post');
        findnextSibling(editTextWrapper, 'Save-Post-Wrapper').setAttribute('style', 'display:inline');
        editTextWrapper.setAttribute('style', 'display:none');
        handlewriteDataintoTextArea(event, ansEditPostPage);
        return;
    }

    return (
        <span className="Edit-Post-text-Wrapper">
            <a href="#" className="Edit-Post-Text-Link" onClick={handleEditPostText}>editPost</a>
        </span>
    )
};
