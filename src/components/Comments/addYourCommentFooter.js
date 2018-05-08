'use strict';

import React from 'react';
import {findAncestor, findpreviousSibling} from "../../util/domTraversal";
import {addComments} from '../../action/ama';

export const AddYourCommentFooter = props => {

    let styleVisibility = {
        pointerEvents : props.EnableCommentSubmit ? 'auto' : 'none',
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
            userName : props.userName,
            likeCount : 0,
        };
        props.dispatch(addComments(commentsObj, props.postObj));
        return;
    }

    return (
        <div style={styleVisibility} className="Add-Comment-Footer">
            <button onClick={handleAddCommentSubmit}>Submit</button>
        </div>
    );
}
