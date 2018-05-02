'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
// Understand Why my images should only be in the Dist folder. If its places outside
// it throws error.
import commentsImg from '../../../../dist/images/Comments.png';
import likeImg from '../../../../dist/images/Upvote.png';
import {findAncestor} from '../../../util/domTraversal';
import {updatePosts} from "../../../action/ama";


export const PostCardData = props => {
    let imgStyle = {
        width: '25px',
        size: 'auto',
    };

    let spanStyle = {
        verticalAlign: 'top',
    };

    let likeStyle = {
        marginRight: '10px',
    };


    function handleLikeClick(event) {
        event.preventDefault();
        let incrementLikeCount = Number(event.currentTarget.lastElementChild.innerHTML) + 1;
        let updatePostCardBody = Object.assign({}, props.postData);
        delete updatePostCardBody._id;
        let closestPostCardParent = findAncestor(event.currentTarget, 'postCardsLists');
        let postCardId = closestPostCardParent.dataset.postId;
        event.currentTarget.lastElementChild.innerHTML = incrementLikeCount;
        updatePostCardBody['likeCount'] = incrementLikeCount;
        if (!props.postData.likedBy.indexOf(props.userId) >= 0) {
            updatePostCardBody['likedBy'].push(props.userId);
        }
        props.dispatch(updatePosts(postCardId, updatePostCardBody));
        return;
    }

    console.log(props.postData);
    console.log(props.userId);
    console.log(props.postData.likedBy.indexOf(props.userId) >= 0);

    return (
        <div className="postCardData">
            <h1 className="postCardData-title">
                <Link to={`app/post/${props.postData._id}`}>{props.postData.postTitle}</Link>
            </h1>
            <p className="postCardData-body">
                <Link to={`app/post/${props.postData._id}`}>{props.postData.postBody}</Link>
            </p>
            <div className="postCardData-footer">
                <a href="#" style={likeStyle}
                   className="postCardData-footer-UpVote" onClick={handleLikeClick}>
                    <img style={imgStyle} src={likeImg} alt="Like image is missing"/>
                    <span style={spanStyle}
                          className="postCardData-footer-UpVote-text">{props.postData.likeCount}</span>
                </a>
                <Link to={`app/post/${props.postData._id}`} className="postCardData-footer-Comments">
                    <img style={imgStyle} src={commentsImg} alt="comments image is missing"/>
                    <span style={spanStyle} className="postCardData-footer-Comments-Link">
                        {props.postData.commentsList.length}
                        </span>
                </Link>
            </div>
        </div>
    );
}

