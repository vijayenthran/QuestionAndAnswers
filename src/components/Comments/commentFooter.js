'use strict';

import React from 'react';
import {CommentLike} from './likeComment';
import {EditComment} from './editComment';

export const CommentCardFooter = props => {
    return (
        <div className="Comment-Card-Footer">
            <CommentLike/>
            <hr/>
            <EditComment/>
        </div>
    );
};
