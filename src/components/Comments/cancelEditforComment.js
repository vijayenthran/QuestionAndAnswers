'use strict';

import React from 'react';

export const CancelEdit = props => {

    let verticalAlign = {
        verticalAlign: 'top',
        marginLeft: '1%'
    };

    return (
        <span className="Cancel-Commment-Wrapper">
          <a style={verticalAlign} href="#">cancel</a>
        </span>
    )
};
