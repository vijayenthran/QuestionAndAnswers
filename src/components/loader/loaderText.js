'use strict';

import React from 'react';
import {connect} from 'react-redux';

export class LoaderText extends React.Component {
    render() {
        const showLoaderText = {
            display: this.props.loaderText ? 'block' : 'none',
            padding : '5px',
        };

        return (
            <div style={showLoaderText} className="LoaderText">Loading...</div>
        )

    }
}

const mapStateToProps = state => ({
    loaderText : state.ama.loaderText,
});

export default connect(mapStateToProps)(LoaderText);
