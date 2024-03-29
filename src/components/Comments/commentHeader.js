'use strict';

import React from 'react';
import {
    deleteSingleComment,
    set_delete_call_from,
    set_delete_post_id_value,
    set_delete_comment_id_value,
    set_delete_post_Obj_for_delete_comment,
    show_delete_Confirmation_PopUp,
}
from "../../action/ama";
import {findAncestor} from "../../util/domTraversal"
import handleTime from '../handleTime'

export const CommentCardHeader = props => {
    let style1 = {
        display: props.createdBy === props.userId ? 'inline' : 'none',
    };

    function processPostObjtoRemoveCommentId(commentId) {
        let postObj = Object.assign({}, props.singlePost);
        let postObjId = postObj._id;
        delete postObj._id;
        let commentsList = postObj.commentsList.filter(comment => comment._id !== commentId).map(filteredComment => filteredComment._id);
        postObj.commentsList = commentsList;
        // props.dispatch(deleteSingleComment(commentId, postObjId, postObj));
        return Promise.resolve(props.dispatch(set_delete_call_from('DeleteSingleComment')))
            .then(() => props.dispatch(set_delete_post_id_value(postObjId)))
            .then(() => props.dispatch(set_delete_comment_id_value(commentId)))
            .then(() =>  props.dispatch(set_delete_post_Obj_for_delete_comment(postObj)));
    }

    function handledeleteClick(event) {
        event.preventDefault();
        let commentCardHeader = findAncestor(event.currentTarget, 'Comment-Card-header');
        let commentCard = findAncestor(commentCardHeader, 'Comment-Card');
        let commentId = commentCard.dataset.commentId;
        props.dispatch(show_delete_Confirmation_PopUp(true));
        processPostObjtoRemoveCommentId(commentId);
        return;
    }

    return (
        <div className="Comment-Card-header">
            <span className="Comment-Card-header-title">{props.userName.toUpperCase()}<span
                className="lite-text">{`commented ${handleTime(props.createdAt)}`}</span></span>
            <span className="Delete-Comment" style={style1} onClick={handledeleteClick}>
                <svg className="Cross-Color" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                    <path
                        d="M63.416 51.416c-0-0-0.001-0.001-0.001-0.001l-19.415-19.416 19.415-19.416c0-0 0.001-0 0.001-0.001 0.209-0.209 0.36-0.453 0.457-0.713 0.265-0.711 0.114-1.543-0.458-2.114l-9.172-9.172c-0.572-0.572-1.403-0.723-2.114-0.458-0.26 0.097-0.504 0.248-0.714 0.457 0 0-0 0-0.001 0.001l-19.416 19.416-19.416-19.416c-0-0-0-0-0.001-0.001-0.209-0.209-0.453-0.36-0.713-0.457-0.711-0.266-1.543-0.114-2.114 0.457l-9.172 9.172c-0.572 0.572-0.723 1.403-0.458 2.114 0.097 0.26 0.248 0.505 0.457 0.713 0 0 0 0 0.001 0.001l19.416 19.416-19.416 19.416c-0 0-0 0-0 0.001-0.209 0.209-0.36 0.453-0.457 0.713-0.266 0.711-0.114 1.543 0.458 2.114l9.172 9.172c0.572 0.572 1.403 0.723 2.114 0.458 0.26-0.097 0.504-0.248 0.713-0.457 0-0 0-0 0.001-0.001l19.416-19.416 19.416 19.416c0 0 0.001 0 0.001 0.001 0.209 0.209 0.453 0.36 0.713 0.457 0.711 0.265 1.543 0.114 2.114-0.458l9.172-9.172c0.572-0.572 0.723-1.403 0.458-2.114-0.097-0.26-0.248-0.504-0.457-0.713z">
                    </path>
                </svg>
            </span>
        </div>
    );
};
