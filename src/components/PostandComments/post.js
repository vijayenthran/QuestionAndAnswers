'use strict';

import React from 'react';
import {Likes} from "../QuestionsPage/PostCards/likes";
import {Comments} from "../QuestionsPage/PostCards/comments";
import {Edit} from "../QuestionsPage/EditPost/edit";
import {EditPostText} from "../QuestionsPage/EditPost/editPostText";
import {Delete} from "../QuestionsPage/EditPost/delete";
import {Cancel} from "../QuestionsPage/EditPost/cancel";
import {SavePost} from "../QuestionsPage/EditPost/savePost";

export const Post = props => {
    let style1 = {
        marginTop: '1%',
    };

    let style2 = {
        whiteSpace: 'pre-wrap',

    };

    return (
        <section className="Detail-Post-Page-Post-Wrapper" data-post-id={props.post._id}>
            <h2 className="Detail-Post-Page-Post-Title">{props.post.postTitle}</h2>
            <div style={style2} className="Detail-Post-Page-Post-Body">
                {props.post.postBody}
            </div>
            <div style={style1} className="Detail-Post-Page-Post-Data-Section">
                <Likes postData={props.post} dispatch={props.dispatch} userId={props.userId}/>
                <Comments postData={props.post} area={`DetailPostPage`}/>
            </div>
            <hr/>
            <div className="Detail-Post-Page-Edit-Post">
                <Edit postData={props.post} userId={props.userId} area="DetailPostPage"/>
                <EditPostText/>
                <SavePost postData={props.post} userId={props.userId} dispatch={props.dispatch}/>
                <Delete area="DetailPostPage" dispatch={props.dispatch}
                        postdeleteddetailpostpage={props.postdeleteddetailpostpage}/>
                <Cancel area="DetailPostPage"/>
            </div>
        </section>
    );
};
