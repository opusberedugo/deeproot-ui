import React from 'react';

/**
 * Content component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to render
 * @param {boolean} props.hasPadding - Whether content has padding
 * @param {string} props.className - Additional CSS classes
 */
const Content = ({
  children,
  hasPadding = true,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'md:ml-64 flex-1 overflow-auto';
  
  // Padding classes
  const paddingClasses = hasPadding ? 'p-6' : '';
  
  // Combined classes
  const classes = `${baseClasses} ${paddingClasses} ${className}`;
  
  return (
    <main className={classes} {...props}>
      {children}
    </main>
  );
};

export default Content;