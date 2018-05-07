'use strict';

import React from 'react';
import {findAncestor, findnextSibling, findpreviousSibling} from "../../../util/domTraversal";


export const Cancel = props => {

    let alignTop = {
        verticalAlign: 'top',
        marginLeft: '3%',
    };

    let displayNonestyle = {
        display: 'none',
    };

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

    function handleCancelClickDetailPostPage(event) {
        event.preventDefault();
        let cancelWrapper = findAncestor(event.currentTarget, 'Cancel-Link-Wrapper');
        let deleteSibling = ObtainSiblings('previous', cancelWrapper, 'Delete-Link-Wrapper');
        deleteSibling.setAttribute('style', 'display:none');
        ObtainSiblings('previous', cancelWrapper, 'Edit-Post-text-Wrapper').setAttribute('style', 'display:none');
        findAncestor(event.currentTarget, 'Cancel-Link-Wrapper').setAttribute('style', 'display:none');
        findpreviousSibling(cancelWrapper, 'Save-Post-Wrapper').setAttribute('style', 'display:none');
        return;
    }

    if (props.area === 'AppPage') {
        return (
            <span style={displayNonestyle} className="Cancel-Link-Wrapper">
                <a href="#" style={alignTop} className="postCardData-footer-Cancel-link"
                  onClick={handleCancelClick}>cancel</a>
            </span>
        );
    }else if(props.area === 'DetailPostPage'){
        return (
            <span style={displayNonestyle} className="Cancel-Link-Wrapper">
                <a href="#" style={alignTop} className="postCardData-footer-Cancel-link"
                    onClick={handleCancelClickDetailPostPage}>Cancel</a>
            </span>
        );
    }else{
        return null;
    }

};
