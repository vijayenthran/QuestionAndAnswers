'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {HeaderNav} from "./NavBar/headerNav";
import {WelcomeText} from "./welcomeText";
import {LogOutLink} from "./LogoutLink";
import Categories from '../components/QuestionsPage/categories';
import './Styles/SliderMenu.scss';

export class SliderMenu extends React.Component {

    render() {
        if(this.props.sliderMenuVisibility){
            return (
                <div className="SliderMenu">
                    <div>X</div>
                    <div className="SliderMenu-Welcome-Details">
                        <WelcomeText userName={this.props.userName}/>
                        <LogOutLink dispatch={this.props.dispatch}/>
                    </div>
                    <HeaderNav dispatch={this.props.dispatch}/>
                    <Categories/>
                </div>
            );
        }else{
            return null;
        }
    }
}

const mapStateToProps = state => ({
    sliderMenuVisibility: state.ama.sliderMenuVisibility,
    userName: state.auth.userInfo ? state.auth.userInfo.user.username : null,
});

export default connect(mapStateToProps)(SliderMenu)
