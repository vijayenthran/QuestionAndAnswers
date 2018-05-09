import React from 'react';
import likeImg from '../../../../dist/images/Upvote.png';
import {updatePosts} from "../../../action/ama";
import {findAncestor} from "../../../util/domTraversal";

export const Likes = props => {

    // Style ----------------------------------------------------------------------------------------------------------//

    let imgStyle = {
        width: '25px',
        size: 'auto',
    };

    let spanStyle = {
        verticalAlign: 'top',
    };

    // Style ----------------------------------------------------------------------------------------------------------//


    // Supportive Functions ----------------------------------------------------------------------------------------------------------//
    function dispatchUpdatePostsCall(event, LikeCount, callType) {
        let closestPostCardParent = findAncestor(event.currentTarget, 'postCardsLists');
        if (closestPostCardParent === null) {
            closestPostCardParent = findAncestor(event.currentTarget, 'Detail-Post-Page-Post-Wrapper');
        }
        let postCardId = closestPostCardParent.dataset.postId;
        let updatePostCardBody = Object.assign({}, props.postData);
        delete updatePostCardBody._id;
        updatePostCardBody['likeCount'] = LikeCount;
        if (callType === 'Increment') {
            updatePostCardBody['likedBy'].push(props.userId);
        } else {
            let userIdIndexValue = props.postData.likedBy.indexOf(props.userId);
            updatePostCardBody['likedBy'].splice(userIdIndexValue, 1);
        }
        props.dispatch(updatePosts(postCardId, updatePostCardBody));
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

    function handleLikeClick(event) {
        event.preventDefault();
        if (props.postData.likedBy.indexOf(props.userId) >= 0) {
            decrementCount(event);
        } else {
            incrementCount(event);
        }
        return;
    }

    // Supportive Functions ----------------------------------------------------------------------------------------------------------//


    return (
        <span className="Like-Wrapper">
                <a href="#" className="Like-Wrapper-UpVote" onClick={handleLikeClick}>
                    <img style={imgStyle} src={likeImg} alt="Either Like or dislike image is missing"/>
                    <span style={spanStyle} className="Like-Wrapper-UpVote-text">{props.postData.likeCount}</span>
                </a>
        </span>
    );
    // if (Array.isArray(props.postData)) {
    //     return (
    //         <span className="Like-Wrapper">
    //             <a href="#" className="Like-Wrapper-UpVote" onClick={handleLikeClick}>
    //                 <img style={imgStyle} src={likeImg} alt="Either Like or dislike image is missing"/>
    //                 <span style={spanStyle} className="Like-Wrapper-UpVote-text">{props.postData.likeCount}</span>
    //             </a>
    //         </span>
    //     );
    // } else {
    //     return (
    //         <span className="Like-Wrapper">
    //             <a href="#" className="Like-Wrapper-UpVote" onClick={handleLikeClick}>
    //             <img style={imgStyle} src={likeImg} alt="Either Like or dislike image is missing"/>
    //             <span style={spanStyle} className="Like-Wrapper-UpVote-text">{props.postData.likeCount}</span>
    //             </a>
    //         </span>
    //     )
    // }
};
