'use strict';

import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

export class LoaderBar extends React.Component {

    render() {
        const Loader = styled.div`
            width: 100%;
            height : 1px;
            background-color: yellow;
            position: fixed;
            top:0;
            left:0;
            z-index: 100;
        `;

        return (
            <Loader>
            </Loader>
        )
    }
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn,
    postsFilter: state.ama.postsFilter,
});

export default connect(mapStateToProps)(LoaderBar);
