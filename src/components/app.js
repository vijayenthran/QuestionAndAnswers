import React from 'react';
import LandingPage from './landing-page';
import QuestionLandingPage from './QuestiosPage/landingpage';
import SignUpPage from './signUp/signUp-page';
import {Route} from 'react-router-dom';
import {PostComponent} from './QuestiosPage/posts';

export function App() {
    return (
        <section className="app">
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signUp" component={SignUpPage} />
            <Route exact path="/app" component={QuestionLandingPage} />
            <Route exact path='/app/post/:postId' component={PostComponent} />
        </section>
    );
}
