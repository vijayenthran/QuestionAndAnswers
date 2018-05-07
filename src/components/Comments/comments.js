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
                        <div className="Comment-Card">
                            <CommentCardHeader userName={elem.userName}/>
                            <CommentCardBody CommentBody={elem.comment}/>
                            <CommentCardFooter/>
                        </div>
                    </li>)}
            </ul>
        </section>
    );
};
