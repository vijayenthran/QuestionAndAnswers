'use strict';

import React from 'react';
import {deleteSingleComment} from "../../action/ama";
import {findAncestor} from "../../util/domTraversal"

export const CommentCardHeader = props => {
    let style1 = {
        marginLeft: '40px',
        display: props.createdBy === props.userId ? 'inline' : 'none',
    };

    function processPostObjtoRemoveCommentId(commentId) {
        let postObj = Object.assign({}, props.singlePost);
        let postObjId = postObj._id;
        delete postObj._id;
        let commentsList = postObj.commentsList.filter(comment => comment._id !== commentId).map(filteredComment => filteredComment._id);
        postObj.commentsList = commentsList;
        props.dispatch(deleteSingleComment(commentId, postObjId, postObj));
        return;
    }

    function handledeleteClick(event) {
        event.preventDefault();
        let commentCardHeader = findAncestor(event.currentTarget, 'Comment-Card-header');
        let commentCard = findAncestor(commentCardHeader, 'Comment-Card');
        let commentId = commentCard.dataset.commentId;
        processPostObjtoRemoveCommentId(commentId);
        return;
    }

    return (
        <div className="Comment-Card-header">
            <span>{props.userName}</span>
            <span style={style1} onClick={handledeleteClick}>x</span>
        </div>
    );
};
