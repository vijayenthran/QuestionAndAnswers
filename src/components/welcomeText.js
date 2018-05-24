'use strict';

import React from 'react';

export const WelcomeText = props => {

    return (
        <span className="Welcome-text SliderMenu-Welcome-text">
            {`Hi ${props.userName}`}
        </span>
    )
};



