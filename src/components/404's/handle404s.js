'use strict';
import React from 'react';
import {Redirect} from 'react-router-dom';


// For the Scope of this App we do a simple redirect to the the app page.
export const Handle404 = props => {
  return (
      <Redirect to="/app"/>
  );
};
