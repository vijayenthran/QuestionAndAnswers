'use strict';

import React from 'react';
import {Edit} from "./edit";
import {Delete} from "./delete";
import {Cancel} from "./cancel";


export const LandingEditPage = props => {
    return (
        <span className="EditPost-Wrapper">
            <Edit postData={props.postData} userId={props.userId} area="AppPage"/>
            <Delete dispatch={props.dispatch} area="AppPage"/>
            <Cancel area="AppPage"/>
        </span>
    );
};
