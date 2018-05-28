'use strict';

import React from 'react';
import {findAncestor, findpreviousSibling} from "../../../util/domTraversal";
import {updatePosts, set_success_notification_message} from "../../../action/ama";

export const SavePost = props => {

    let style2 = {
        verticalAlign: 'top',
        display: 'none',
    };

    function handleDispatchUpdatePost(event, updateTextTitle, updateTextBody) {
        let updatePostCardBody = Object.assign({}, props.postData);
        let postId = props.postData._id;
        delete updatePostCardBody._id;
        updatePostCardBody['postBody'] = updateTextBody;
        updatePostCardBody['postTitle'] = updateTextTitle;
        props.dispatch(updatePosts(postId, updatePostCardBody));
        return;
    }


    function getUpdatedTitleAndPost(event, saveTextWrapper) {
        let _updatedTextTitle;
        let _updateTextBody;
        let saveSection = findAncestor(saveTextWrapper, 'Detail-Post-Page-Edit-Post');
        _updatedTextTitle = findpreviousSibling(saveSection, 'edit-Post-title-div').firstChild.value;
        _updateTextBody = findpreviousSibling(saveSection, 'edit-Post-body-div').firstChild.value;
        findpreviousSibling(saveSection, 'Detail-Post-Page-Post-Title').innerHTML = _updatedTextTitle;
        findpreviousSibling(saveSection, 'Detail-Post-Page-Post-Body').innerHTML = _updateTextBody;
        findpreviousSibling(saveSection, 'edit-Post-title-div').classList.add('remove-display');
        findpreviousSibling(saveSection, 'edit-Post-body-div').classList.add('remove-display');
        findpreviousSibling(saveSection, 'Detail-Post-Page-Post-Title').classList.remove('remove-display');
        findpreviousSibling(saveSection, 'Detail-Post-Page-Post-Body').classList.remove('remove-display');
        return{
            updatedTextTitle : _updatedTextTitle,
            updatedTextBody : _updateTextBody
        };
    }

    function handleSavepost(event) {
        event.preventDefault();
        props.dispatch(set_success_notification_message(`saved Edit Post`))
        let saveTextWrapper = findAncestor(event.currentTarget, 'Save-Post-Wrapper');
        let postPageBodyText = getUpdatedTitleAndPost(event, saveTextWrapper);
        findpreviousSibling(saveTextWrapper, 'Edit-Post-text-Wrapper').setAttribute('style', 'display:inline');
        saveTextWrapper.setAttribute('style', 'display:none');
        handleDispatchUpdatePost(event, postPageBodyText.updatedTextTitle, postPageBodyText.updatedTextBody);
        return;
    }

    return (
        <span style={style2} className="Save-Post-Wrapper">
            <a className="Save-Post-Wrapper-Text" href="#" onClick={handleSavepost}>save</a>
        </span>
    );
};
