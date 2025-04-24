import React from 'react';

/**
 * Badge component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {string} props.variant - Badge variant (primary, secondary, success, warning, danger, info)
 * @param {string} props.size - Badge size (sm, md)
 * @param {boolean} props.rounded - Whether badge is rounded
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} props.className - Additional CSS classes
 */
const Badge = ({
  variant = 'primary',
  size = 'md',
  rounded = true,
  children,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800'
  };
  
  // Rounded classes
  const roundedClasses = rounded ? 'rounded-full' : 'rounded';
  
  // Combined classes
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${roundedClasses} ${className}`;
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;