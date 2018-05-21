'use strict';

import React from 'react';
// Understand Why my images should only be in the Dist folder. If its places outside
// it throws error.
import editImg from '../../../../dist/images/EditIcon.png';
import {findnextSibling, findAncestor} from "../../../util/domTraversal";

export const Edit = props => {
    function handleEditClick(event) {
        event.preventDefault();
        findnextSibling(event.currentTarget, 'Delete-Link-Wrapper').setAttribute('style', 'display:inline');
        findnextSibling(event.currentTarget, 'Cancel-Link-Wrapper').setAttribute('style', 'display:inline');
        return;
    }

    function handleEditClickforDetailPostPage(event) {
        event.preventDefault();
        event.currentTarget.setAttribute('style', 'display:none');
        findnextSibling(event.currentTarget, 'Edit-Post-text-Wrapper').setAttribute('style', 'display:inline');
        findnextSibling(event.currentTarget, 'Delete-Link-Wrapper').setAttribute('style', 'display:inline');
        findnextSibling(event.currentTarget, 'Cancel-Link-Wrapper').setAttribute('style', 'display:inline');
        return;
    }


    let validateVisible = {
        display: props.userId === props.postData.userId ? 'inline' : 'none'
    };


    if (props.area === 'AppPage') {
        return (
            <a href="#" style={validateVisible} className="Edit-Post-Card" onClick={handleEditClick}>
                <img className="Edit-Post-Card-Image" src={editImg} alt="Edit image is missing"/>
                <span className="Edit-Post-Card-Text">edit</span>
            </a>
        );
    } else if (props.area === 'DetailPostPage') {
        return (
            <a href="#" style={validateVisible} className="Edit-Post-Card-Dpp" onClick={handleEditClickforDetailPostPage}>
                <img className="Edit-Post-Card-Image-Dpp" src={editImg} alt="Edit image is missing"/>
                <span className="Edit-Post-Card-Text-Dpp">edit</span>
            </a>
        );
    } else {
        return null;
    }

};
