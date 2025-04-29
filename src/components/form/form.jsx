// Form.jsx
import React from 'react';

const Form = ({ children, onSubmit, className = '', noValidate = true }) => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form 
        onSubmit={onSubmit} 
        className={`space-y-6 ${className}`}
        noValidate={noValidate} // This disables HTML5 validation
      >
        {children}
      </form>
    </div>
  );
};

export default Form;