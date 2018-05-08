'use strict';

import React from 'react';
import {AddCommentHeader} from "./addCommentHeader";
import {AddYourCommentBody} from "./addYourCommentBody";
import {AddYourCommentFooter} from "./addYourCommentFooter";

export const AddComment = props => {
    return(
        <div className="Add-Comment">
            <AddCommentHeader userName={props.userName}/>
            <AddYourCommentBody dispatch={props.dispatch}/>
            <AddYourCommentFooter postObj={props.postObj} dispatch={props.dispatch} postId={props.postId} userId={props.userId} userName={props.userName} EnableCommentSubmit={props.EnableCommentSubmit}/>
        </div>
    );
}
