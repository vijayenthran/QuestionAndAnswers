'use strict';

import React from 'react';
import {findAncestor} from "../../../util/domTraversal";
import {deletepost, deletecommentsWithPostId, deleteDetailPostHelper} from "../../../action/ama";
import {Redirect} from 'react-router-dom';

export const Delete = props => {
    if (props.postdeleteddetailpostpage) {
        return <Redirect to="/app"/>
    }

    function handleDeleteLink(event) {
        event.preventDefault();
        let closestPostCardParent = findAncestor(event.currentTarget, 'postCardsLists');
        let postCardId = closestPostCardParent.dataset.postId;
        closestPostCardParent.remove();
        props.dispatch(deletepost(postCardId));
        props.dispatch(deletecommentsWithPostId(postCardId));
        return;
    }

    function handleDeleteLinkDetailPostPage(event) {
        event.preventDefault();
        let closestPostCardParent = findAncestor(event.currentTarget, 'Detail-Post-Page-Post-Wrapper');
        let postCardId = closestPostCardParent.dataset.postId;
        return props.dispatch(deleteDetailPostHelper(true, postCardId));
    }

    if (props.area === 'AppPage') {
        return (
            <span className="Delete-Link-Wrapper">
                 <a href="#" className="Delete-Link"
                    onClick={handleDeleteLink}>delete</a>
             </span>
        );
    } else if (props.area === 'DetailPostPage') {
        return (
            <span className="Delete-Link-Wrapper">
                 <a href="#" className="Delete-Link"
                    onClick={handleDeleteLinkDetailPostPage}>delete</a>
             </span>
        );
    } else {
        return null;
    }

};
