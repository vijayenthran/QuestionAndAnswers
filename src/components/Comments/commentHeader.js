'use strict';

import React from 'react';

export const CommentCardHeader = props => {
    return(
        <div className="Comment-Card-header">
            <span>{props.userName}</span>
        </div>
    );
};
