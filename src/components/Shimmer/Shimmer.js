'use strict';

import React from 'react';
import {connect} from 'react-redux';
import '../Styles/shimmer.scss';

export class Shimmer extends React.Component {
    render() {
        if(this.props.shimmer){
            return (
                <div className="timeline-wrapper">
                    <div className="timeline-item">
                        <div className="animated-background">
                            <div className="background-masker header-bottom"></div>
                            <div className="background-masker header-right"></div>
                            <div className="background-masker title-bottom"></div>
                            <div className="background-masker title-right"></div>
                            <div className="background-masker content-top"></div>
                            <div className="background-masker content-first-end"></div>
                            <div className="background-masker content-second-line"></div>
                            <div className="background-masker content-second-end"></div>
                            <div className="background-masker content-third-line"></div>
                            <div className="background-masker content-third-end"></div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return null;
        }

    }
}

const mapStateToProps = state => ({
    shimmer: state.ama.shimmer,
});

export default connect(mapStateToProps)(Shimmer);
