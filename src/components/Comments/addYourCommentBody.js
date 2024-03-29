'use strict';

import React from 'react';
import {enable_post_comment_submit_button} from "../../action/ama";

export const AddYourCommentBody = props => {

    function handleTextAreaChange(event) {
        // TODO For now you are implementing that there should be only two characters. See if you can implement minimal words here
        if(event.currentTarget.value.length>1){
            props.dispatch(enable_post_comment_submit_button(true));
        }else{
            props.dispatch(enable_post_comment_submit_button(false));
        }
    }

    return (
        <div className="Add-Comments-Body">
            <textarea className="Add-Comments-Body-Text" placeholder="Write your comment" onChange={handleTextAreaChange}></textarea>
        </div>
    )
};
