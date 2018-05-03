import React from 'react';

const textArea = (props) => {
    let spanStyle = {
        verticalAlign: 'top',
    };

    return (
        <section>
            <label style={spanStyle} htmlFor={props.id}>{props.id}</label>
            {/*Spread operator to get all the events on input field like on click. Those events are passed down**/}
            {/*as props. from the decarator component redux Form.*/}
            {/*The input events should be given to the input fields in order to for the track events triggered on that input field*/}
            <textarea style={props.style} placeholder={props.placeholderValue} id={props.id} {...props.input}/>
            {props.meta.error && props.meta.touched ? <span>{props.meta.error}</span> : null}
        </section>
    );
};

export default textArea;
