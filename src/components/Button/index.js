/* eslint-disable react/button-has-type */
import React from 'react';
import './Button.scss';

const Button = ({ children, type, variant, icon, ...props }) => {
  return (
    <div role="button" className={`Button__${variant}`} {...props}>
      {icon && <span>{icon}</span>}
      <p>{children}</p>
    </div>
  );
};

Button.defaultProps = {
  children: null,
  type: 'button',
  variant: 'contained',
  icon: null,
};

export default Button;
