'use strict';

import React from 'react';

export const CommentCardBody = props => {
    return (
        <div className="Comment-Body-Div">
            <div className="Comment-Card-Body">
                {props.CommentBody}
            </div>
            <div className="Edit-Comment-Card remove-display">
                <textarea className="Edit-Comment-Card-Text-Area">
                </textarea>
            </div>
        </div>
    );
};


