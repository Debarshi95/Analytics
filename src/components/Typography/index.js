import React from 'react';
import './Typography.scss';

const variants = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  body1: 'span',
  body2: 'span',
};

const Typography = ({ variant, children, ...props }) => {
  const Component = variants[variant];
  return (
    <Component className={`Typography__${variant}`} {...props}>
      {children}
    </Component>
  );
};

Typography.defaultProps = {
  variant: 'p',
  children: '',
};
export default Typography;
