'use strict';

import React from 'react';
import {findAncestor, findnextSibling, findpreviousSibling} from "../../../util/domTraversal";


export const Cancel = props => {

    function ObtainSiblings(metaData, target, cls) {
        if (metaData === 'previous') {
            return findpreviousSibling(target, cls);
        } else if (metaData === 'next') {
            return findnextSibling(target, cls);
        }
    }

    function handleCancelClick(event) {
        event.preventDefault();
        let cancelWrapper = findAncestor(event.currentTarget, 'Cancel-Link-Wrapper');
        let deleteSibling = ObtainSiblings('previous', cancelWrapper, 'Delete-Link-Wrapper');
        deleteSibling.setAttribute('style', 'display:none');
        findAncestor(event.currentTarget, 'Cancel-Link-Wrapper').setAttribute('style', 'display:none');
        return;
    }


    function handleCancelEditTextArea(event, cancelWrapper){
        let postEditSection = findAncestor(cancelWrapper, 'Detail-Post-Page-Edit-Post');
        findpreviousSibling(postEditSection, 'edit-Post-title-div').classList.add('remove-display');
        findpreviousSibling(postEditSection, 'edit-Post-body-div').classList.add('remove-display');
        findpreviousSibling(postEditSection, 'Detail-Post-Page-Post-Title').classList.remove('remove-display');
        findpreviousSibling(postEditSection, 'Detail-Post-Page-Post-Body').classList.remove('remove-display');
        return;
    }


    function handleCancelClickDetailPostPage(event) {
        event.preventDefault();
        let cancelWrapper = findAncestor(event.currentTarget, 'Cancel-Link-Wrapper');
        let deleteSibling = ObtainSiblings('previous', cancelWrapper, 'Delete-Link-Wrapper');
        deleteSibling.setAttribute('style', 'display:none');
        ObtainSiblings('previous', cancelWrapper, 'Edit-Post-text-Wrapper').setAttribute('style', 'display:none');
        ObtainSiblings('previous', cancelWrapper, 'Edit-Post-Card-Dpp').setAttribute('style', 'display:inline');
        findAncestor(event.currentTarget, 'Cancel-Link-Wrapper').setAttribute('style', 'display:none');
        findpreviousSibling(cancelWrapper, 'Save-Post-Wrapper').setAttribute('style', 'display:none');
        handleCancelEditTextArea(event, cancelWrapper);
        return;
    }

    if (props.area === 'AppPage') {
        return (
            <span className="Cancel-Link-Wrapper">
                <a href="#" className="PostCard-Cancel-Link"
                  onClick={handleCancelClick}>cancel</a>
            </span>
        );
    }else if(props.area === 'DetailPostPage'){
        return (
            <span className="Cancel-Link-Wrapper">
                <a href="#" className="PostCard-Cancel-Link"
                    onClick={handleCancelClickDetailPostPage}>cancel</a>
            </span>
        );
    }else{
        return null;
    }

};
