'use strict';

import React from 'react';
import {logOut} from '../action/auth';
import {connect} from 'react-redux';
import {HeaderNav} from "./NavBar/headerNav";
import {Link} from 'react-router-dom';
import {BurgerMenu} from "./burgerMenu";
import {WelcomeText} from "./welcomeText";
import{LogOutLink} from "./LogoutLink";

// import LoaderBar from './loaderBar/loaderBar';

import './Styles/headerBarStyles.scss';

export function HeaderBar(props) {
    if (props.loginStatus && !props.position) {
        return (
            <section className="HeaderBar">
                {/*<LoaderBar></LoaderBar>*/}
                <div className="Logo">
                    <Link  className="Logo-Link" to="/app">
                        Que's | Ans
                    </Link>
                </div>
                <BurgerMenu dispatch={props.dispatch}/>
                <div className="HeaderNav">
                    <HeaderNav dispatch={props.dispatch}/>
                </div>
                <div className="User-Info-Section-App-Page">
                    <WelcomeText userName={props.userName}/>
                    <LogOutLink dispatch={props.dispatch}/>
                </div>
            </section>
        )
    } else if (props.position && props.position === `postCommentsPage`) {
        return (
            <section className="HeaderBar">
                <div className="User-Info-Section-Comments-Page">
                    <div className="Logo">
                        <Link  className="Logo-Link" to="/app">
                            Que's | Ans
                        </Link>
                    </div>
                    <WelcomeText userName={props.userName}/>
                    <LogOutLink dispatch={props.dispatch}/>
                </div>
            </section>
        )
    } else {
        return(
            <section className="HeaderBar">
                <div className="Logo Logo-Main-Page">
                    <Link className="Logo-Link" to="/">
                        Que's | Ans
                    </Link>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn,
    userName: state.auth.userInfo ? state.auth.userInfo.user.username : null,
});

export default connect(mapStateToProps)(HeaderBar);

