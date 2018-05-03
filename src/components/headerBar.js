import React from 'react';
import {logOut} from '../action/auth';
import {connect} from 'react-redux';
import {HeaderNav} from "./NavBar/headerNav"

export function HeaderBar(props) {
    let headernav={
        display : 'inline-block',
    };

    let logoutbtn ={
        display : 'inline-block',
        marginLeft : '1%',
    };

    let welcomeText ={
        marginLeft : '5%',
    };

    function logoutUser() {
        const logoutObj = {userInfo: null, loggedIn: false};
        props.dispatch(logOut(logoutObj));
        return;
    }

    if (props.loginStatus) {
        return (
            <section className="HeaderBar">
                <div style={headernav}><HeaderNav className="header-nav"/></div>
                <span style={welcomeText} className="welcome-text">{`Hi ${props.userName}`}</span>
                <div style={logoutbtn}><button className="Logout-btn" onClick={logoutUser}>{'Logout'}</button></div>
            </section>
        )
    }
    return <div className="headerBar">HeaderContent</div>
}

const manipulateUserInfo = state => {
    let userName;
    if(state.auth.userInfo !== null){
        return state.auth.userInfo.user.username
    }else{
        userName = null;
    }
};

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn,
    userName : manipulateUserInfo(state)
});

export default connect(mapStateToProps)(HeaderBar);

