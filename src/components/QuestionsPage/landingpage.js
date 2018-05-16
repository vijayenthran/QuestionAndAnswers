'use strict';

import React from 'react';
import HeaderBar from '../headerBar'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import CategorySection from './categories';
import PostCardsSection from './PostCards/postCards';
import NewPost from './NewPosts/landingpage';
import {getPosts, no_more_post_cards} from "../../action/ama";
import '../Styles/addPostStyles.scss';

export class QuestionLandingPage extends React.Component {

    componentDidMount() {
        return Promise.resolve(this.props.dispatch(no_more_post_cards(false)))
            .then(() => this.props.dispatch(getPosts(null, 0)));
    }

    render() {
        if (!this.props.loginStatus) {
            return <Redirect to="/"/>;
        }
        return (
            <section className="question-page-content">
                <HeaderBar/>
                <div className="Question-Page-Body">
                    <div className="Posts-Section">
                        <div className="Add-New-Post-Div">
                            <NewPost/>
                        </div>
                        <PostCardsSection className="post-cards-section"/>
                    </div>
                    <CategorySection/>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn
});

export default connect(mapStateToProps)(QuestionLandingPage)
