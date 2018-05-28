'use strict';

import React from 'react';
import {findAncestor} from "../../../util/domTraversal";
import {deletepost, deletecommentsWithPostId, deleteDetailPostHelper, set_delete_call_from, set_delete_post_id_value, show_delete_Confirmation_PopUp} from "../../../action/ama";
import {Redirect} from 'react-router-dom';

export const Delete = props => {
    if (props.postdeleteddetailpostpage) {
        return <Redirect to="/app"/>
    }

    function handleDeleteLink(event) {
        event.preventDefault();
        let closestPostCardParent = findAncestor(event.currentTarget, 'postCardsLists');
        let postCardId = closestPostCardParent.dataset.postId;
        // closestPostCardParent.remove();
        props.dispatch(set_delete_call_from('AppPage'));
        props.dispatch(show_delete_Confirmation_PopUp(true));
        props.dispatch(set_delete_post_id_value(postCardId));
        // props.dispatch(deletepost(postCardId));
        // props.dispatch(deletecommentsWithPostId(postCardId));
        return;
    }

    function handleDeleteLinkDetailPostPage(event) {
        event.preventDefault();
        let closestPostCardParent = findAncestor(event.currentTarget, 'Detail-Post-Page-Post-Wrapper');
        let postCardId = closestPostCardParent.dataset.postId;
        props.dispatch(set_delete_call_from('DetailPostPage'));
        props.dispatch(set_delete_post_id_value(postCardId));
        props.dispatch(show_delete_Confirmation_PopUp(true));

        // props.dispatch(deleteDetailPostHelper(true, postCardId));
        return;
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
