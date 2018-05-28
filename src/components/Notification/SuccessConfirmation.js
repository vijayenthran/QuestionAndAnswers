'use strict';

import React from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from 'react-redux';
import {} from "../../action/ama";

export class SuccessConfirmation extends React.Component {
    constructor() {
        super();
    }


    render() {
        const slideDown = keyframes `
                    0%, 100% {
              -webkit-transform: translateY(-50px);
                  }
                 3%,99%{
                  -webkit-transform: translateY(0px);
                }

        `;

        const SuccessNotification = styled.div`
                 text-align: center;
                 color: white;
                 position: fixed;
                 z-index: 5;
                 width: 65%;
                 top: 4px;
                 left: 16%;
                 background: #4968AD;
                 padding: 10px;
                 border-radius: 6px;
                 -webkit-box-shadow: 0 0 5px black;
                 -moz-box-shadow: 0 0 5px black;
                 box-shadow: 0 0 5px black;
                 -webkit-transform: translateY(-50px);
                 -webkit-animation: ${slideDown} 9.5s ease-in-out forwards;
                 -moz-transform: translateY(-50px);
                 -moz-animation: ${slideDown} 2.5s ease;
`;
        if(this.props.successNotification){
            return (
                <SuccessNotification className="SuccessNotification">
                    <div className="SuccessMessage">
                        Successfully {this.props.successNotificationMessage} !!!
                    </div>
                </SuccessNotification>
            )
        }else{
            return null;
        }
    }
};


const mapStateToProps = state => ({
    successNotification: state.ama.successNotification,
    successNotificationMessage: state.ama.successNotificationMessage,
});

export default connect(mapStateToProps)(SuccessConfirmation)
