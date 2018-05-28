'use strict';

import React from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from 'react-redux';
import {
    show_delete_Confirmation_PopUp
    ,set_delete_call_from,
    set_delete_post_id_value,
    set_delete_comment_id_value,
    set_delete_post_Obj_for_delete_comment,
    deleteNotificationWrapper,
    set_success_notification,
    set_success_notification_message
} from "../../action/ama";

export class DeleteConfirmation extends React.Component {
    constructor() {
        super();
        this.handleCancelDelete = this.handleCancelDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount(){
        let path = this.props.currentPath;
        if(this.props.location.pathname !== path){
            this.props.dispatch(show_delete_Confirmation_PopUp(false));
        }

    }

    handleDelete() {
        this.props.dispatch(show_delete_Confirmation_PopUp(false));
        if(this.props.deleteCallFrom === 'AppPage' && this.props.deletePostId){
            this.props.dispatch(deleteNotificationWrapper(this.props.deleteCallFrom, this.props.deletePostId, null, null));
            this.props.dispatch(set_success_notification_message('Deleted Post'));
        } else if (this.props.deleteCallFrom === 'DetailPostPage' && this.props.deletePostId){
            this.props.dispatch(deleteNotificationWrapper(this.props.deleteCallFrom, this.props.deletePostId, null, null));
            this.props.dispatch(set_success_notification_message('Deleted Post'));
        }else if(this.props.deleteCallFrom === 'DeleteSingleComment' && this.props.deletePostId && this.props.deleteCommentId && this.props.modifiedPostObj){
            this.props.dispatch(deleteNotificationWrapper(this.props.deleteCallFrom, this.props.deletePostId, this.props.deleteCommentId, this.props.modifiedPostObj));
            this.props.dispatch(set_success_notification_message('Deleted Comment'));
        }
        this.props.dispatch(set_delete_call_from(null));
        this.props.dispatch(set_delete_post_id_value(null));
        this.props.dispatch(set_delete_comment_id_value(null));
        this.props.dispatch(set_delete_post_Obj_for_delete_comment(null));
        this.props.dispatch(set_success_notification(true));
        return
    }

    handleCancelDelete() {
        this.props.dispatch(show_delete_Confirmation_PopUp(false));
        return;
    }

    render() {
        const DeleteNotification = styled.div`
             display: ${this.props.showDeleteConfirmationPopUp ? `block` : `none`}; 
             position: fixed;
             z-index: 4;
             width: 65%;
             top: 2px;
             left: 16%;
             background: indianred;
             padding: 5px;
             border-radius: 6px;
             -webkit-box-shadow: 0 0 5px black;
            -moz-box-shadow: 0 0 5px black;
             box-shadow: 0 0 5px black;
     `;

        const ConfirmDeleteButton = styled.button`
            display: inline-block;
            margin-right: 5%;
            padding: 5px;
            font-size: 1em;
            border-radius: 7px;
            
            &:hover{
            background: rgba(37,37,37,0.93);
            color: white;
            cursor: pointer;
            }
    `;

        const ConfirmDeleteText = styled.div`
        display: inline-block;
        width: 65%;
        padding-left: 10px;
        color : white;
        
         @media (max-width:  650px) {
              display: block;
              width: 100%;
              text-align: center;
              margin-bottom: 2%;
            }
     `;

        const CancelDelete = styled.a`
        display: inline-block;
        text-decoration: none;
        color:  white;
        
        &:hover{
        text-decoration: underline;
        cursor:pointer;
        color: black;
        }
    `;

        const DeleteConfirmationDiv = styled.div`
        width: 30%;
        text-align: right;
        display: inline-block;
        
        
        @media (max-width:  650px) {
          display: block;
          width: 100%;
          text-align: center;
        }   
    `;


        return (
            <DeleteNotification className="Delete-Confirmation-Notification">
                <ConfirmDeleteText className="Delete-Confirmation-Text">Are you sure you want to delete?</ConfirmDeleteText>
                <DeleteConfirmationDiv>
                    <ConfirmDeleteButton className="Delete-Confirmation-Confirm-Button"
                                         onClick={this.handleDelete}>delete</ConfirmDeleteButton>
                    <CancelDelete className="Delete-Confirmation-Cancel-Link" href="#" onClick={this.handleCancelDelete}>cancel</CancelDelete>
                </DeleteConfirmationDiv>
            </DeleteNotification>
        )
    }
};


const mapStateToProps = state => ({
    showDeleteConfirmationPopUp : state.ama.showDeleteConfirmationPopUp,
    deleteCallFrom : state.ama.deleteCallFrom,
    deletePostId : state.ama.deletePostId,
    deleteCommentId : state.ama.deleteCommentId,
    modifiedPostObj : state.ama.modifiedPostObj,
    currentPath : state.ama.routePath
});

export default connect(mapStateToProps)(DeleteConfirmation)
