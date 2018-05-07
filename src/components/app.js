import React from 'react';
import LandingPage from './landing-page';
import QuestionLandingPage from './QuestionsPage/landingpage';
import SignUpPage from './signUp/signUp-page';
import {Route} from 'react-router-dom';
import PostsLandingPage from './PostandComments/landingpage';

export function App() {
    return (
        <section className="app">
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signUp" component={SignUpPage} />
            <Route exact path="/app" component={QuestionLandingPage} />
            <Route exact path='/app/post/:postId' component={PostsLandingPage} />
        </section>
    );
}
