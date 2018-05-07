'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import commentsImg from '../../../../dist/images/Comments.png';


export const Comments = props => {
    let imgStyle = {
        width: '25px',
        size: 'auto',
    };

    let spanStyle = {
        verticalAlign: 'top',
    };

    if (props.area === 'AppPage') {
        return (
            <span className="Comments-Wrapper">
                <Link to={`app/post/${props.postData._id}`}>
                    <img style={imgStyle} src={commentsImg} alt="comments image is missing"/>
                    <span style={spanStyle} className="Comments-Wrapper-Comment-Length">
                        {props.postData.commentsList.length}
                    </span>
                </Link>
            </span>
        );
    } else if (props.area === 'DetailPostPage') {
        return (
            <span className="Comments-Wrapper">
                <img style={imgStyle} src={commentsImg} alt="comments image is missing"/>
                <span style={spanStyle} className="Comments-Wrapper-Comment-Length">
                    {props.postData.commentsList.length}
                </span>
            </span>
        );
    } else {
        return null;
    }

};
