'use strict';

import React from 'react';
import {findAncestor, findpreviousSibling} from "../../../util/domTraversal";
import {updatePosts} from "../../../action/ama";

export const SavePost = props => {

    let style2 = {
        verticalAlign: 'top',
        display: 'none',
    };

    function handleDispatchUpdatePost(event, updateTextBody) {
        let updatePostCardBody = Object.assign({}, props.postData);
        let postId = props.postData._id;
        delete updatePostCardBody._id;
        updatePostCardBody['postBody'] = updateTextBody;
        props.dispatch(updatePosts(postId, updatePostCardBody));
        return;
    }

    function handleSavepost(event) {
        event.preventDefault();
        let saveTextWrapper = findAncestor(event.currentTarget, 'Save-Post-Wrapper');
        let DetailPostPageEdit = findAncestor(saveTextWrapper, 'Detail-Post-Page-Edit-Post');
        let postPageBody = findpreviousSibling(DetailPostPageEdit, 'Detail-Post-Page-Post-Body');
        postPageBody.setAttribute('contentEditable', 'false');
        let postPageBodyText = postPageBody.innerHTML;
        findpreviousSibling(saveTextWrapper, 'Edit-Post-text-Wrapper').setAttribute('style', 'display:inline');
        saveTextWrapper.setAttribute('style', 'display:none');
        handleDispatchUpdatePost(event, postPageBodyText);
        return;
    }

    return (
        <span style={style2} className="Save-Post-Wrapper">
            <a className="Save-Post-Wrapper-Text" href="#" onClick={handleSavepost}>save</a>
        </span>
    );
};
