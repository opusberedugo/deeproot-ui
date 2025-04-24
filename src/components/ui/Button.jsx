import React from 'react';

/**
 * Button component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {string} props.variant - Button style variant (primary, secondary, outline, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.isFullWidth - Whether button should take full width
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {React.ReactNode} props.children - Button content
 * @param {function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  disabled = false,
  children,
  onClick,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'rounded transition-all duration-200 font-medium focus:outline-none';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50'
  };
  
  // Width classes
  const widthClasses = isFullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Combined classes
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${className}`;
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;