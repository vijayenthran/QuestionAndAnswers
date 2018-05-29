'use strict';

import React from 'react';
import '../Styles/footer.scss';
import githubOctaCat from '../../../dist/images/GitHub-Mark-32px.png'
export const FooterBar = () => {

    function GithubLink() {
        window.open('https://github.com/vijayenthran/');
    }

    return (
        <section className="FooterBar">
            <div className="Logo-FooterBar">
                <h2>Que's | Ans</h2>
            </div>
            <div className="Back-to-top">
                <a className="Back-to-Top-Link" href="#Home">Back to Top</a>
            </div>
            <hr className="Line-Footer"/>
            <div className="Share-Footer">
                {/*<img src="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small" data-mobile-iframe="true" alt=""/>*/}
                {/*<a href="#" onClick={facebookShare}>fb share</a>*/}
                <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/"
                     data-layout="button" data-size="small" data-mobile-iframe="true">
                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
                       className="fb-xfbml-parse-ignore">facebookShare</a>
                </div>
                <div className="Github-Link">
                    <a className="Checkout-Github-Text" href="#" onClick={GithubLink}>Checkout my work
                        <img className="Checkout-Github-Img" src={githubOctaCat} alt="Github Octacat image"/>
                    </a>
                </div>
            </div>
            <div className="email">
                <p className="email-text">Please Keep in Touch !</p>
                <svg className="email-Icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                    <path d="M58 8h-52c-3.3 0-6 2.7-6 6v40c0 3.3 2.7 6 6 6h52c3.3 0 6-2.7 6-6v-40c0-3.3-2.7-6-6-6zM24.921 34.398l-16.921 13.181v-31.353l16.921 18.172zM11.024 16h41.953l-20.976 15.75-20.976-15.75zM25.581 35.106l6.419 6.894 6.419-6.894 13.16 16.894h-39.158l13.16-16.894zM39.079 34.398l16.921-18.172v31.353l-16.921-13.181z">
                    </path>
                </svg>
                <a className="Mail-Link" href="mailto:tharan.Vijay@gmail.com">Vijay</a>
            </div>
            <div className="Quote-Div">
                <p className="Quote">
                    Code is Poetry.
                </p>
            </div>
        </section>
    )
};
