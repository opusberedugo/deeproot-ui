import React, { useEffect } from 'react';

/**
 * Modal component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {function} props.onClose - Close handler
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {React.ReactNode} props.footer - Modal footer
 * @param {string} props.size - Modal size (sm, md, lg, xl)
 * @param {boolean} props.closeOnEsc - Whether modal closes on escape key
 * @param {boolean} props.closeOnOverlayClick - Whether modal closes on overlay click
 * @param {string} props.className - Additional CSS classes
 */
const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  className = '',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };
  
  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, closeOnEsc]);
  
  // If modal is not open, don't render anything
  if (!isOpen) return null;
  
  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div 
        className={`${sizeClasses[size]} w-full bg-white rounded-lg shadow-xl ${className}`}
        {...props}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
          >
            {/* X icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal body */}
        <div className="px-6 py-4">
          {children}
        </div>
        
        {/* Modal footer */}
        {footer && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;