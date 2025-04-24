import React, { useState } from 'react';

const FormField = ({
  label,
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  required = false,
  autoComplete,
  className = '',
}) => {
  const [error, setError] = useState('');
  
  const validateInput = (inputType, inputValue) => {
    // Reset error state if field is empty and not required
    if (!inputValue && !required) {
      setError('');
      return true;
    }
    
    // Required field validation
    if (!inputValue && required) {
      setError('This field is required');
      return false;
    }
    
    switch (inputType) {
      case 'name':
        // Name validation - at least 2 characters, letters, spaces, hyphens only
        if (!/^[A-Za-z\s-]{3,}$/.test(inputValue)) {
          setError('Please enter a valid name (letters, spaces, and hyphens only)');
          return false;
        }
        break;
        
      case 'email':
        // Email validation with regex pattern
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputValue)) {
          setError('Please enter a valid email address');
          return false;
        }
        break;
        
      case 'password':
        // Password validation - min 8 chars, at least one uppercase, lowercase, number
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(inputValue)) {
          setError('Password must be at least 8 characters with uppercase, lowercase, and numbers');
          return false;
        }
        break;
    }
    
    // Clear error if validation passes
    setError('');
    return true;
  };
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Determine validation type based on field name or type
    let validationType = type;
    if (type === 'text') {
      if (name.toLowerCase().includes('name') || 
          name.toLowerCase() === 'firstname' || 
          name.toLowerCase() === 'lastname') {
        validationType = 'name';
      }
    }
    
    // Validate as user types
    validateInput(validationType, newValue);
    
    // Pass the value to parent component
    if (onChange) {
      onChange(e);
    }
  };
  
  const handleBlur = (e) => {
    // Re-validate on blur for a better user experience
    let validationType = type;
    if (type === 'text') {
      if (name.toLowerCase().includes('name') || 
          name.toLowerCase() === 'firstname' || 
          name.toLowerCase() === 'lastname') {
        validationType = 'name';
      }
    }
    
    validateInput(validationType, e.target.value);
  };
  
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        autoComplete={autoComplete}
        className={`w-full py-3 px-4 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && (
        <p className="error-label mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormField;