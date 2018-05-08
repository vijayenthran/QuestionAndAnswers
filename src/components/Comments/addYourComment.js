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
            <AddYourCommentFooter EnableCommentSubmit={props.EnableCommentSubmit}/>
        </div>
    );
}
