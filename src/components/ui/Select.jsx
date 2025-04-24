import React from 'react';

/**
 * Select component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {string} props.label - Select label
 * @param {string} props.value - Select value
 * @param {function} props.onChange - Change handler
 * @param {array} props.options - Select options array [{label: string, value: string}]
 * @param {string} props.placeholder - Select placeholder
 * @param {string} props.error - Error message
 * @param {string} props.helperText - Helper text
 * @param {boolean} props.isFullWidth - Whether select should take full width
 * @param {boolean} props.disabled - Whether select is disabled
 * @param {boolean} props.required - Whether select is required
 * @param {string} props.id - Select id
 * @param {string} props.name - Select name
 * @param {string} props.className - Additional CSS classes
 */
const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
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
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  // Base classes
  const baseClasses = 'block rounded border px-3 py-2 focus:outline-none focus:ring-2 transition-all duration-200 appearance-none bg-white';
  
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
    <div className={`${isFullWidth ? 'w-full' : ''} mb-4 relative`}>
      {label && (
        <label 
          htmlFor={selectId} 
          className="block mb-1 font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={classes}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Select;