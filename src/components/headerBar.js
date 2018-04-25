import React from 'react';
import {logOut} from '../action/auth';
import {connect} from 'react-redux';
import {HeaderNav} from "./NavBar/headerNav"

export function HeaderBar(props) {
    function logoutUser() {
        const logoutObj = {userInfo: null, loggedIn: false};
        props.dispatch(logOut(logoutObj));
        return;
    }

    if (props.loginStatus) {
        return (
            <section className="HeaderBar">
                <HeaderNav />
                <button className="Logout-btn" onClick={logoutUser}>{'Logout'}</button>
            </section>
        )
    }
    return <div className="headerBar">HeaderContent</div>
}


const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(HeaderBar);

