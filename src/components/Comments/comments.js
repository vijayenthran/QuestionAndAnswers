'use strict';

import React from 'react';
import {CommentCardHeader} from './commentHeader';
import {CommentCardBody} from './commentBody';
import {CommentCardFooter} from './commentFooter';

export const Comments = props => {
    return (
        <section className="Dpp-Comments-List-Wrapper">
            <ul className="Dpp-Comments-list">
                {props.commentsList.map(elem =>
                    <li key={elem._id}>
                        <div className="Comment-Card" data-comment-id={elem._id}>
                            <CommentCardHeader createdAt={elem.createdAt} dispatch={props.dispatch} userName={elem.userName} createdBy={elem.userId} userId={props.userId} singlePost={props.singlePost}/>
                                <CommentCardBody CommentBody={elem.comment} />
                                <CommentCardFooter dispatch={props.dispatch} comment={elem} createdBy={elem.userId} likedBy={elem.likedBy} userId={props.userId} likeCount={elem.likeCount}/>
                        </div>
                    </li>)}
            </ul>
        </section>
    );
};
