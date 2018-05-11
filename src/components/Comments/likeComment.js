'use strict';

import React from 'react';
import likeImg from '../../../dist/images/Upvote.png';
import {updateComment} from "../../action/ama";

export const CommentLike = props => {
    let imgStyle = {
        width: '22px',
        size: 'auto',
    };

    let verticalAlignStyle = {
        verticalAlign: 'top',
    };

    function dispatchUpdatePostsCall(event, LikeCount, callType) {
        let updateCommentCardBody = Object.assign({}, props.comment);
        let commentId = updateCommentCardBody._id;
        delete updateCommentCardBody._id;
        updateCommentCardBody['likeCount'] = LikeCount;
        if (callType === 'Increment') {
            updateCommentCardBody['likedBy'].push(props.userId);
        } else {
            let userIdIndexValue = props.comment.likedBy.indexOf(props.userId);
            updateCommentCardBody['likedBy'].splice(userIdIndexValue, 1);
        }
        props.dispatch(updateComment(commentId, updateCommentCardBody));
        return;
    }

    function incrementCount(event) {
        let incrementLikeCount = Number(event.currentTarget.lastElementChild.innerHTML) + 1;
        event.currentTarget.lastElementChild.innerHTML = incrementLikeCount;
        dispatchUpdatePostsCall(event, incrementLikeCount, 'Increment');
        return;
    }

    function decrementCount(event) {
        let decrementedLikeCount = Number(event.currentTarget.lastElementChild.innerHTML);
        if (decrementedLikeCount >= 1) {
            decrementedLikeCount = decrementedLikeCount - 1;
        }
        event.currentTarget.lastElementChild.innerHTML = decrementedLikeCount;
        dispatchUpdatePostsCall(event, decrementedLikeCount);
        return;
    }

    function handleCommentsClick(event) {
        event.preventDefault();
        // TODO ask how does react remembers the props during comments click
        if (props.comment.likedBy.indexOf(props.userId) >= 0) {
            decrementCount(event);
        } else {
            incrementCount(event);
        }
        return;
    }

    return (
        <span className="Comment-Like-Wrapper">
             <a href="#" className="Comment-Like-Wrapper-UpVote" onClick={handleCommentsClick}>
                <img style={imgStyle} src={likeImg} alt="Either Like or dislike image is missing"/>
                 <span style={verticalAlignStyle} className="Comment-Like-Wrapper-UpVote-text">{props.likeCount}</span>
            </a>
        </span>
    );
};
