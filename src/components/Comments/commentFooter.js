'use strict';

import React from 'react';
import {CommentLike} from './likeComment';
import {EditComment} from './editComment';
import {DeleteComment} from "./deletecomment";
import {SaveComment} from "./saveEditComment";
import {CancelEdit} from "./cancelEditforComment";

export const CommentCardFooter = props => {
    return (
        <div className="Comment-Card-Footer">
            <CommentLike/>
            <hr/>
            <EditComment/>
            <DeleteComment/>
            <SaveComment/>
            <CancelEdit/>
        </div>
    );
};
