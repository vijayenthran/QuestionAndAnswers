'use strict';

import React from 'react';
import likeImg from '../../../dist/images/Upvote.png';

export const CommentLike = props => {

    let imgStyle = {
        width: '22px',
        size: 'auto',
    };

    function handleCommentsClick(event){
        event.preventDefault();
        return;
    }

    return(
        <span className="Comment-Like-Wrapper">
             <a href="#" className="Comment-Like-Wrapper-UpVote" onClick={handleCommentsClick}>
                <img style={imgStyle} src={likeImg} alt="Either Like or dislike image is missing"/>
                 {/*<span style={spanStyle} className="Like-Wrapper-UpVote-text">{props.postData.likeCount}</span>*/}
            </a>
        </span>
    );
};
