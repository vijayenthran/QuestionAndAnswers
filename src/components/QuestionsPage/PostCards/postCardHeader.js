'use strict';

import React from 'react';

export const PostCardHeader = props => {
    return(
        <div className="postCardHeader">
            <p className="postCardHeader-Content">{`${props.postData.userName.toUpperCase()} posted in ${props.postData.categoryName}`}</p>
        </div>
    )
};

