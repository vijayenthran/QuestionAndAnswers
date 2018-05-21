'use strict';

import React from 'react';
import {findAncestor, findpreviousSibling} from "../../util/domTraversal";
import {addComments, enable_post_comment_submit_button} from '../../action/ama';

export const AddYourCommentFooter = props => {

    let styleVisibility = {
        pointerEvents: props.EnableCommentSubmit ? 'auto' : 'none',
    };

    let errorBtn = {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'indianred',
        padding : '10px',
        color: 'indianred',
    };

    function handleAddCommentSubmit(event) {
        event.preventDefault();
        let commentFooter = findAncestor(event.currentTarget, 'Add-Comment-Footer');
        let textAreaText = findpreviousSibling(commentFooter, 'Add-Comments-Body').firstChild.value;
        findpreviousSibling(commentFooter, 'Add-Comments-Body').firstChild.value = '';
        let commentsObj = {
            comment: textAreaText,
            postId: props.postId,
            userId: props.userId,
            userName: props.userName,
            likeCount: 0,
        };
        props.dispatch(addComments(commentsObj, props.postObj));
        props.dispatch(enable_post_comment_submit_button(false));
        return;
    }

    if (props.EnableCommentSubmit) {
        return (
            <div className="Add-Comment-Footer">
                <button className="Add-Comment-Footer-btn" onClick={handleAddCommentSubmit}>postComment</button>
            </div>
        );
    } else {
        return (
            <div style={styleVisibility} className="Add-Comment-Footer">
                <button style={errorBtn} onClick={handleAddCommentSubmit}>postComment</button>
            </div>
        );
    }

};
