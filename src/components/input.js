import React from 'react';
import '../pages/index/index.css';

const Input = (props) => {
    return(
        <input 
            disabled={props.disabled} 
            type={props.type}
            id={props.id}
            value={props.value} 
            onChange={props.onChange}
        />
    )
}

export default Input;