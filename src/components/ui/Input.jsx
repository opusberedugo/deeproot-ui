import React from 'react';

/**
 * Input component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {string} props.type - Input type (text, password, email, etc.)
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {string} props.helperText - Helper text
 * @param {boolean} props.isFullWidth - Whether input should take full width
 * @param {boolean} props.disabled - Whether input is disabled
 * @param {boolean} props.required - Whether input is required
 * @param {string} props.id - Input id
 * @param {string} props.name - Input name
 * @param {string} props.className - Additional CSS classes
 */
const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  isFullWidth = true,
  disabled = false,
  required = false,
  id,
  name,
  className = '',
  ...props
}) => {
  // Generate a unique ID if none is provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Base classes
  const baseClasses = 'block rounded border px-3 py-2 focus:outline-none focus:ring-2 transition-all duration-200';
  
  // Width classes
  const widthClasses = isFullWidth ? 'w-full' : '';
  
  // State classes
  const stateClasses = error
    ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-200'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200';
  
  // Disabled classes
  const disabledClasses = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';
  
  // Combined classes
  const classes = `${baseClasses} ${widthClasses} ${stateClasses} ${disabledClasses} ${className}`;
  
  return (
    <div className={`${isFullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block mb-1 font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={classes}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;