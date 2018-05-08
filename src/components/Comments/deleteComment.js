'use strict';

import React from 'react';

export const DeleteComment = props => {

    let verticalAlign = {
        verticalAlign: 'top',
        marginLeft: '1%'
    };

    return (
        <span className="Delete-Commment-Wrapper">
          <a style={verticalAlign} href="#">delete</a>
        </span>
    )
};
