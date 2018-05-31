'use strict';

import React from 'react';
import howitWorks from '../../images/page-how-it-works-3.png';
import register from '../../images/reg.jpeg';
import questions from '../../images/questions.jpg';
import answer from '../../images/Answer.jpg';
import ama from '../../images/Ask_Me_Anything.jpg';

export const AboutQues = porps => {
    return (
        <div id="About-Ques">
            <div className="About-Ques-Heading">
                <h2 className="About-Ques-Head">HOW IT WORKS</h2>
                <img className="how-it-works-image" src={howitWorks} alt="How it works image"/>
            </div>
            <div className="About-Ques-Information">
                <div className="About-Ques-div About-Ques-Login-Signup-Info">
                    <h2 className="About-Ques-div-Head About-Ques-Login-Signup-Info-Head">Register</h2>
                    <img className="Register-Image" src={register} alt="Register image"/>
                    <p>Sign Up to Register</p>
                </div>
                <div className="About-Ques-div About-Ques-Read-Ques">
                    <h2 className="About-Ques-div-Head About-Ques-Read-Ques-Head">Question</h2>
                    <img className="Register-Image" src={questions} alt="question image"/>
                    <p>Read,Like, Post Question</p>
                </div>
                <div className="About-Ques-div About-Post-Ques-Comments">
                    <h2 className="About-Ques-div-Head About-Post-Ques-Comments-Head">Answer</h2>
                    <img className="Register-Image" src={answer} alt="Answer image"/>
                    <p>Comment on Question</p>
                </div>
                <div className="About-Ques-div Road-Map">
                    <h2 className="About-Ques-div-Head Road-Map-Head">Future Plans</h2>
                    <img className="Register-Image" src={ama} alt="ama image"/>
                    <p>Live A.M.A</p>
                </div>
            </div>
        </div>
    )
};

