'use strict';

import React from 'react';
import {CommentLike} from './likeComment';
import {EditComment} from './editComment';
import {SaveComment} from "./saveEditComment";

export const CommentCardFooter = props => {
    return (
        <div className="Comment-Card-Footer">
            <CommentLike dispatch={props.dispatch} comment={props.comment} userId={props.userId} likedBy={props.likedBy} likeCount={props.likeCount}/>
            <hr/>
            <EditComment dispatch={props.dispatch} comment={props.comment} userId={props.userId}/>
            <SaveComment dispatch={props.dispatch} comment={props.comment}/>
        </div>
    );
};
