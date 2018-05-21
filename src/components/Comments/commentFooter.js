'use strict';

import React from 'react';
import {CommentLike} from './likeComment';
import {EditComment} from './editComment';
import {SaveComment} from "./saveEditComment";
import {CancelEditCommentText} from "./cancelEditComment";

export const CommentCardFooter = props => {

    let validateVisibility ={
      display:   props.userId === props.comment.userId ? 'block' : 'none'
    };

    return (
        <div className="Comment-Card-Footer">
            <CommentLike dispatch={props.dispatch} comment={props.comment} userId={props.userId} likedBy={props.likedBy} likeCount={props.likeCount}/>
            <hr style={validateVisibility}/>
            <EditComment dispatch={props.dispatch} comment={props.comment} userId={props.userId}/>
            <SaveComment dispatch={props.dispatch} comment={props.comment}/>
            <CancelEditCommentText comment={props.comment}/>
        </div>
    );
};
