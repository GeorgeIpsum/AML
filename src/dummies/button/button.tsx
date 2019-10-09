import React from 'react';
import './button.scss';

const Button = (props: any) => {
  const variant = props.variant && props.variant;
  let bg = "#3454D1";
  if(variant) {
    switch(variant) {
      case "theme":
        bg = "#922D50";
        break;
      default:
        bg = "#3454D1";
        break;
    }
  }

  return(
    <button style={{background: bg, ...props.style}} type="button" className="Button" onClick={props.onClick}>{props.children}</button>
  );
};

export default Button;