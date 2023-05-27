import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  // Color
  // -- white
  // -- black
  // -- green
  // -- blue
  // -- red
  // Text Color
  // -- white
  // -- black
  // -- green
  // -- blue
  // -- red
  // Size
  // -- small
  // -- medium
  // -- large
  // StartIcon
  // -- font-awesome-icons
  // EndIcon
  // -- font-awesome-icons
  const color = props.color ? props.color : "blue";
  const textColor = props.textColor ? props.textColor : "black";
  const size = props.size ? props.size : "medium";
  const startIcon = props.startIcon ? props.startIcon : false;
  const endIcon = props.endIcon ? props.endIcon : false;

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      form={props.form}
      className={`
        ${classes.button} 
        ${classes["s-" + size]} 
        ${classes["c-" + color]} 
        ${classes["t-" + textColor]} 
        ${props.className ? props.className : ""}
    `}
    >
      {startIcon && (
        <i
          className={`fa fa-${props.startIcon}`}
          aria-hidden='true'
        ></i>
      )}
      {props.children}
      {endIcon && (
        <i
          className={`endIcon fa fa-${props.endIcon}`}
          aria-hidden='true'
        ></i>
      )}
    </button>
  );
};

export default Button;
