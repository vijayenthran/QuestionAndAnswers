'use strict';

import React from 'react';

export const AddCommentHeader = props => {
    return(
        <div className="Add-Comment-Header">
            {`${props.userName} Your Comment`}
        </div>
    )
};
