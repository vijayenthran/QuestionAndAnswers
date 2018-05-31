'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import commentsImg from '../../../images/Comments.png';


export const Comments = props => {
    if (props.area === 'AppPage') {
        return (
            <span className="Comments-Wrapper">
                <Link to={`app/post/${props.postData._id}`} className="Comment-Wrapper-Link">
                    <img className="Comments-Wrapper-img" src={commentsImg} alt="comments image is missing"/>
                    <span className="Comments-Wrapper-Comments-Count">
                        {props.postData.commentsList.length}
                    </span>
                </Link>
            </span>
        );
    } else if (props.area === 'DetailPostPage') {
        return (
            <span className="Comments-Wrapper">
                <img className="Comments-Wrapper-img" src={commentsImg} alt="comments image is missing"/>
                <span className="Comments-Wrapper-Comments-Count">
                    {props.commentLength}
                </span>
            </span>
        );
    } else {
        return null;
    }

};
