import React from 'react';

const input = (props) => {
    return (
        <section>
            <label htmlFor={props.id}>{props.id}</label>
            {/*Spread operator to get all the events on input field like on click. Those events are passed down**/}
            {/*as props. from the decarator component redux Form.*/}
            {/*The input events should to the input fields in order to for the track events triggered on that input field*/}
            <input type={props.type} id={props.id} {...props.input}/>
            {props.meta.error && props.meta.touched ? <span>{props.meta.error}</span> : null}
        </section>
    );
};

export default input;
