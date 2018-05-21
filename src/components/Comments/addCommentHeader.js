'use strict';

import React from 'react';

export const AddCommentHeader = props => {
    return(
        <h3 className="Add-Comment-Header">
            {`${props.userName} Your Comment`}
        </h3>
    )
};
