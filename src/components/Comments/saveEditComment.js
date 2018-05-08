'use strict';

import React from 'react';

export const SaveComment = props => {

    let verticalAlign = {
        verticalAlign: 'top',
        marginLeft: '1%'
    };

    return (
        <span className="Save-Commment-Wrapper">
          <a style={verticalAlign} href="#">save</a>
        </span>
    )
};
