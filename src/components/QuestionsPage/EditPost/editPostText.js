'use strict';

import React from 'react';
import {findnextSibling, findAncestor, findpreviousSibling} from "../../../util/domTraversal";

export const EditPostText = props => {

    function handleEditPostText(event) {
        event.preventDefault();
        let editTextWrapper = findAncestor(event.currentTarget, 'Edit-Post-text-Wrapper');
        let ansEditPostPage = findAncestor(event.currentTarget, 'Detail-Post-Page-Edit-Post');
        findpreviousSibling(ansEditPostPage, 'Detail-Post-Page-Post-Body').setAttribute('contentEditable', 'true');
        findnextSibling(editTextWrapper, 'Save-Post-Wrapper').setAttribute('style', 'display:inline');
        editTextWrapper.setAttribute('style', 'display:none');
        return;
    }

    return (
        <span className="Edit-Post-text-Wrapper">
            <a href="#" className="Edit-Post-Text-Link" onClick={handleEditPostText}>editPostText</a>
        </span>
    )
};
