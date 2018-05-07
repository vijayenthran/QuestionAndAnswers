'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Comments} from './comments';

export class CommentsLandingPage extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <Comments commentsList={this.props.commentsList}/>
        );
    }
}


const mapStateToProps = state => ({
    commentsList: state.ama.comments,
});

export default connect(mapStateToProps)(CommentsLandingPage);
