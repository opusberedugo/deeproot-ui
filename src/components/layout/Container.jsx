import React from 'react';

/**
 * Container component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Container content
 * @param {boolean} props.fluid - Whether container is fluid
 * @param {string} props.className - Additional CSS classes
 */
const Container = ({
  children,
  fluid = false,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = fluid ? 'w-full px-4' : 'max-w-screen-xl mx-auto px-4';
  
  // Combined classes
  const classes = `${baseClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;