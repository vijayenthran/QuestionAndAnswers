'use strict';

import React from 'react';

export const Comments = props => {
    return (
        <section className="Dpp-Comments-List-Wrapper">
            <ul className="Dpp-Comments-list">
                {props.commentsList.map(elem => <li key={elem._id}>{elem.comment}</li>)}
            </ul>
        </section>
    );
};
