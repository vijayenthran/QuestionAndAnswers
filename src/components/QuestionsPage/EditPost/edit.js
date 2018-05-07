'use strict';

import React from 'react';
// Understand Why my images should only be in the Dist folder. If its places outside
// it throws error.
import editImg from '../../../../dist/images/EditIcon.png';
import {findnextSibling} from "../../../util/domTraversal";

export const Edit = props => {
    function handleEditClick(event) {
        event.preventDefault();
        findnextSibling(event.currentTarget, 'Delete-Link-Wrapper').setAttribute('style', 'display:inline');
        findnextSibling(event.currentTarget, 'Cancel-Link-Wrapper').setAttribute('style', 'display:inline');
        return;
    }

    function handleEditClickforDetailPostPage(event) {
        event.preventDefault();
        findnextSibling(event.currentTarget, 'Edit-Post-text-Wrapper').setAttribute('style', 'display:inline');
        findnextSibling(event.currentTarget, 'Delete-Link-Wrapper').setAttribute('style', 'display:inline');
        findnextSibling(event.currentTarget, 'Cancel-Link-Wrapper').setAttribute('style', 'display:inline');
        return;
    }


    let validateVisible = {
        display: props.userId === props.postData.userId ? 'inline' : 'none'
    };

    let imgStyle1 = {
        width: '25px',
        size: 'auto',
        marginLeft: '3%',
    };

    let imgStyle2 = {
        width: '25px',
        size: 'auto',
    };

    let spanStyleEdit = {
        verticalAlign: 'top',
        marginRight: '2%',
    };

    if (props.area === 'AppPage') {
        return (
            <a href="#" style={validateVisible} className="Edit-Wrapper" onClick={handleEditClick}>
                <img style={imgStyle1} src={editImg} alt="Edit image is missing"/>
                <span style={spanStyleEdit} className="Edit-Wrapper-text">EditPost</span>
            </a>
        );
    } else if (props.area === 'DetailPostPage') {
        return (
            <a href="#" style={validateVisible} className="Edit-Wrapper" onClick={handleEditClickforDetailPostPage}>
                <img style={imgStyle2} src={editImg} alt="Edit image is missing"/>
                <span style={spanStyleEdit} className="Edit-Wrapper-text">EditPost</span>
            </a>
        );
    } else {
        return null;
    }

};
