import React from 'react';
import '../pages/index/index.css';

const Button = (props) => {
  return(
    <button className={`btn ${ props.className }`} onClick={props.onClick} disabled={props.disabled}>{props.text}</button>
  )
}

export default Button;