import React from 'react';

const textArea = (props) => {

    function handleError(id){
        let element;
        if(id === 'Post-Title'){
            element = document.getElementById('Post-Title');
        } else if(id === 'Post-Body'){
            element = document.getElementById('Post-Body');
        }
        element.classList.add('error-border');
        return(
            <div className="text-area-error">{props.meta.error}</div>
        );
    }

    function RemoveElementErrorIndicator(id){
        let element;
        if(id === 'Post-Title'){
            element = document.getElementById('Post-Title');
        } else if(id === 'Post-Body'){
            element = document.getElementById('Post-Body');
        }
        if(element){
            element.classList.remove('error-border');
        }
        return;
    }

    return (
        <section>
            <label className={props.labeltitle} htmlFor={props.id}>{props.id.split('-').join(' ')}</label>
            {/*Spread operator to get all the events on input field like on click. Those events are passed down**/}
            {/*as props. from the decarator component redux Form.*/}
            {/*The input events should be given to the input fields in order to for the track events triggered on that input field*/}
            <textarea className={props.class} style={props.style} placeholder={props.placeholderValue} id={props.id} {...props.input}/>
            {/*{props.meta.error && props.meta.touched ? <div className="text-area-error">{props.meta.error}</div> : null}*/}
            {props.meta.error && props.meta.touched ? handleError(props.id) : RemoveElementErrorIndicator(props.id)}
        </section>
    );
};

export default textArea;
