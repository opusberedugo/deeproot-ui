import React from 'react';

/**
 * Card component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.header - Card header content
 * @param {React.ReactNode} props.footer - Card footer content
 * @param {boolean} props.hasShadow - Whether card has shadow
 * @param {boolean} props.hasBorder - Whether card has border
 */
const Card = ({
  children,
  className = '',
  header,
  footer,
  hasShadow = true,
  hasBorder = false,
  ...props
}) => {
  // Base classes
  const baseClasses = 'bg-white rounded-lg overflow-hidden';
  
  // Shadow and border classes
  const shadowClasses = hasShadow ? 'shadow-md' : '';
  const borderClasses = hasBorder ? 'border border-gray-200' : '';
  
  // Combined classes
  const classes = `${baseClasses} ${shadowClasses} ${borderClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {header && (
        <div className="px-4 py-3 border-b border-gray-100 font-medium">
          {header}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;