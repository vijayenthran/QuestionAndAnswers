'use strict';

import React from 'react';
import editImg from '../../../dist/images/EditIcon.png';

export const EditComment = props => {

    // let validateVisible = {
    //     display: props.userId === props.postData.userId ? 'inline' : 'none'
    // };

    let imgStyle2 = {
        width: '22px',
        size: 'auto',
    };

    let verticalAlign = {
        verticalAlign: 'top',
    };

    return (
        <span className="Edit-Comment-Wrapper">
          <a href="#" className="Edit-Wrapper">
                <img style={imgStyle2} src={editImg} alt="Edit image is missing"/>
                <span style={verticalAlign} className="Edit-Wrapper-text">edit</span>
            </a>
      </span>
    )
};
