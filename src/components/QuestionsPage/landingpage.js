'use strict';

import React from 'react';
import HeaderBar from '../Header/headerBar'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import CategorySection from './categories';
import PostCardsSection from './PostCards/postCards';
import NewPost from './NewPosts/landingpage';
import {getPosts, no_more_post_cards, getPostsFilter, set_route_path} from "../../action/ama";
import '../Styles/addPostStyles.scss';
import SliderMenu from "../SliderMenu/slideMenu";
import Shimmer from '../Shimmer/Shimmer';
import DeleteConfirmation from "../Notification/DeleteConfirmation";
import SuccessConfirmation from "../Notification/SuccessConfirmation";

export class QuestionLandingPage extends React.Component {

    componentDidMount() {
        return Promise.resolve(this.props.dispatch(no_more_post_cards(false)))
            .then(() => {
                if (this.props.postsFilter) {
                    this.props.dispatch(getPostsFilter(this.props.postsFilter, 0));
                    return;
                } else {
                    this.props.dispatch(getPosts(null, 0));
                    return;
                }
            })
            .then(() => this.props.dispatch(set_route_path(this.props.location)));
    }

    render() {
        if (!this.props.loginStatus) {
            return <Redirect to="/"/>;
        }

        return (
            <section className="question-page-content">
                <DeleteConfirmation location={this.props.location}/>
                <SuccessConfirmation/>
                <HeaderBar/>
                <div className="Question-Page-Body">
                    <div className="Posts-Section">
                        <div className="Add-New-Post-Div">
                            <NewPost/>
                        </div>
                        <Shimmer/>
                        <Shimmer/>
                        <Shimmer/>
                        <Shimmer/>
                        <Shimmer/>
                        <PostCardsSection className="post-cards-section"/>
                    </div>
                    <div className="Category-Section">
                        <CategorySection/>
                    </div>
                </div>
                <SliderMenu/>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loggedIn,
    postsFilter: state.ama.postsFilter
});

export default connect(mapStateToProps)(QuestionLandingPage)
