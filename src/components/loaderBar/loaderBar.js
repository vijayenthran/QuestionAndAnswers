'use strict';

import React from 'react';
import {connect} from 'react-redux';
import styled, { keyframes }  from 'styled-components';

export class LoaderBar extends React.Component {

    render() {

        const load = keyframes `
                    0%{
                        width: 2%;
                     }
                    10%{  
                        width: 10%;
                     }
        
        `;

        const Loader = styled.div`
            width: 100%;
            // width: calc(100% - 10px);
            height : 5px;
            background-color: #00ff7e;
            position: fixed;
            top:0;
            left:0;
            z-index: 100;
            // animation: ${load} 3s ease infinite;
            border-radius:20px
        `;

        // if (this.props.loader) {
        //     return (
        //         <Loader>
        //             <progressBarSpan>
        //
        //             </progressBarSpan>
        //         </Loader>
        //     )
        // }
        return (
            <Loader>
            </Loader>
        )
    }
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn,
    postsFilter: state.ama.postsFilter,
    loader: state.ama.loader,
});

export default connect(mapStateToProps)(LoaderBar);
