'use strict';

import React from 'react';
import handleTime from '../../handleTime';

export const PostCardHeader = props => {
    return (
        <div className="postCardHeader">
            <p className="postCardHeader-Content">
                {props.postData.userName.toUpperCase()}
                <span className="lite-text">posted in</span>
                {props.postData.categoryName}
                <span className="lite-text">{handleTime(props.postData.createdAt)}</span>
            </p>
        </div>
    )
};

