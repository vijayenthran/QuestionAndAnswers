'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
// Understand Why my images should only be in the Dist folder. If its places outside
// it throws error.
import commentsImg from '../../../../dist/images/Comments.png';
import likeImg from '../../../../dist/images/Upvote.png';
import editImg from '../../../../dist/images/EditIcon.png';
import {findAncestor} from '../../../util/domTraversal';
import {updatePosts} from "../../../action/ama";


export const PostCardData = props => {
    let imgStyle = {
        width: '25px',
        size: 'auto',
    };

    let imgStyle1 = {
        width: '25px',
        size: 'auto',
        marginLeft: '3%',
    };

    let spanStyle = {
        verticalAlign: 'top',
    };

    let editPostStyle = {
        display: 'none',
    };

    let spanStyleEdit ={
        verticalAlign: 'top',
        marginRight: '2%',
    };

    let validateLike = {
        pointerEvents: props.postData.likedBy.indexOf(props.userId) >= 0 ? 'none' : 'auto'
    };

    let validateVisible = {
        display: props.userId === props.postData.userId ? 'inline' : 'none'
    };

    let cursorNotAllowed = {
        cursor: props.postData.likedBy.indexOf(props.userId) >= 0 ? "not-allowed" : 'pointer',
        verticalAlign: 'top',
    };

    let alignTop = {
        verticalAlign: 'top'
    };

    function updateElementStyle(event) {
        event.currentTarget.setAttribute("style", "pointer-events: none;");
        findAncestor(event.currentTarget, 'postCardData-like-Wrapper').setAttribute("style", "cursor: not-allowed; vertical-align:top;");
        return;
    }

    function dispatchUpdatePostsCall(event, incrementLikeCount) {
        let closestPostCardParent = findAncestor(event.currentTarget, 'postCardsLists');
        let postCardId = closestPostCardParent.dataset.postId;
        let updatePostCardBody = Object.assign({}, props.postData);
        delete updatePostCardBody._id;
        updatePostCardBody['likeCount'] = incrementLikeCount;
        if (props.postData.likedBy.indexOf(props.userId) < 0) {
            updatePostCardBody['likedBy'].push(props.userId);
        }
        props.dispatch(updatePosts(postCardId, updatePostCardBody));
        return;
    }

    function incrementCount(event) {
        let incrementLikeCount = Number(event.currentTarget.lastElementChild.innerHTML) + 1;
        event.currentTarget.lastElementChild.innerHTML = incrementLikeCount;
        dispatchUpdatePostsCall(event, incrementLikeCount);
        return;
    }

    function handleLikeClick(event) {
        event.preventDefault();
        incrementCount(event);
        updateElementStyle(event);
        return;
    }

    function handleEditClick(event) {
        event.preventDefault();
        console.log(props);
        return;
    }

    function handleDeleteClick(event) {
        event.preventDefault();
        return;
    }


    return (
        <div className="postCardData">
            <h1 className="postCardData-title">
                <Link to={`app/post/${props.postData._id}`}>{props.postData.postTitle}</Link>
            </h1>
            <p className="postCardData-body">
                <Link to={`app/post/${props.postData._id}`}>{props.postData.postBody}</Link>
            </p>
            <div className="postCardData-footer">
                <span className="postCardData-like-Wrapper" style={cursorNotAllowed}>
                    <a href="#" style={validateLike}
                       className="postCardData-footer-UpVote" onClick={handleLikeClick}>
                        <img style={imgStyle} src={likeImg} alt="Like image is missing"/>
                        <span style={spanStyle}
                              className="postCardData-footer-UpVote-text">{props.postData.likeCount}</span>
                    </a>
                </span>
                <Link to={`app/post/${props.postData._id}`} className="postCardData-footer-Comments">
                    <img style={imgStyle} src={commentsImg} alt="comments image is missing"/>
                    <span style={spanStyle} className="postCardData-footer-Comments-Link">
                        {props.postData.commentsList.length}
                        </span>
                </Link>
                <a href="#" style={validateVisible} className="postCardData-footer-Edit" onClick={handleEditClick}>
                    <img style={imgStyle1} src={editImg} alt="Edit image is missing"/>
                    <span style={spanStyleEdit} className="postCardData-footer-Edit-text">EditPost</span>
                </a>
                <span style={editPostStyle} className="postCardData-footer-Delete-Wrapper">
                    <a href="#" style={alignTop} className="postCardData-footer-Delete-btn" onClick={handleDeleteClick}>DeletePost</a>
                    <a href="#" style={alignTop} className="postCardData-footer-Cancel-link">cancel</a>
                </span>
            </div>
        </div>
    );
}

