'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import {Likes} from "./likes";
import {Comments} from "./comments";
import {LandingEditPage} from "../EditPost/landingpage";
const sliceLimit = 60;

export const PostCardData = props => {

    function handleSlicePostBody(text) {
        let postbodyContentArray = text.split(' ');
        let postBodyText;
        if (postbodyContentArray.length >= sliceLimit) {
            postBodyText = postbodyContentArray.slice(0, sliceLimit).join(' ') + `....`;
        } else {
            postBodyText = postbodyContentArray.join(' ');
        }
        return postBodyText;
    }


    return (
        <div className="postCardData">
            <h1 className="postCardData-title">
                <Link className="postCardData-title-Val" to={`app/post/${props.postData._id}`}>{props.postData.postTitle}</Link>
            </h1>
            <p className="postCardData-body">
                <Link className="postCardData-body-Val" to={`app/post/${props.postData._id}`}>{handleSlicePostBody(props.postData.postBody)}</Link>
            </p>
            <div className="postCardData-footer">
                <Likes postData={props.postData} dispatch={props.dispatch} userId={props.userId}/>
                <Comments postData={props.postData} area={`AppPage`}/>
                <LandingEditPage dispatch={props.dispatch} postData={props.postData} userId={props.userId}/>
            </div>
        </div>
    );
}

