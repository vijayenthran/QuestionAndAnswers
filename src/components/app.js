'use strict';

import React from 'react';
import LandingPage from './landing-page';
import QuestionLandingPage from './QuestionsPage/landingpage';
import SignUpPage from './signUp/signUp-page';
import {Route, Switch} from 'react-router-dom';
import {Handle404} from './404\'s/handle404s';
import PostsLandingPage from './PostandComments/landingpage';
import './Styles/appStyles.scss';

export function App() {
    return (
        <section className="app">
            <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signUp" component={SignUpPage} />
            <Route exact path="/app" component={QuestionLandingPage} />
            <Route exact path='/app/post/:postId' component={PostsLandingPage} />
            <Route exact path='*'  component={Handle404}/>
            </Switch>
        </section>
    );
}
