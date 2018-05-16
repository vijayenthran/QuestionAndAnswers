'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {set_show_add_post_form} from "../../../action/ama";
import AddPost from './addPost';

export class CreatePostLandingPage extends React.Component {
    constructor() {
        super();
        this.addPost = this.addPost.bind(this);
    }

    addPost() {
        this.props.dispatch(set_show_add_post_form(true));
        return;
    }

    render() {
        if (this.props.showAddPost) {
            return (
                <AddPost/>
            );
        }
        return (
            <button className="Add-New-Post-btn" onClick={this.addPost}>POST YOUR AMA</button>
        );
    }
}


const mapStateToProps = state => ({
    showAddPost: state.ama.showAddPost
});
export default connect(mapStateToProps)(CreatePostLandingPage)
