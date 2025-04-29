import React from 'react';

/**
 * Sidebar component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Sidebar content
 * @param {boolean} props.isOpen - Whether sidebar is open (mobile)
 * @param {function} props.onClose - Close handler (mobile)
 * @param {string} props.width - Sidebar width
 * @param {boolean} props.hasShadow - Whether sidebar has shadow
 * @param {string} props.className - Additional CSS classes
 */
const Sidebar = ({
  children,
  isOpen = true,
  onClose,
  width = '64',
  hasShadow = true,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'bg-white border-r border-gray-200 h-screen';
  
  // Shadow classes
  const shadowClasses = hasShadow ? 'shadow-sm' : '';
  
  // Width classes
  const widthClass = `w-${width}`;
  
  // Mobile classes
  const mobileClasses = isOpen
    ? 'fixed inset-y-0 left-0 z-50 transform translate-x-0 transition-transform ease-in-out duration-300'
    : 'fixed inset-y-0 left-0 z-50 transform -translate-x-full transition-transform ease-in-out duration-300';
  
  // Desktop classes
  const desktopClasses = 'hidden md:block';
  
  // Combined classes
  const classes = `${baseClasses} ${shadowClasses} ${className}`;
  
  // Handle overlay click (mobile)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <>
      {/* Mobile sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={handleOverlayClick}
        >
          <div className={`${classes} ${mobileClasses} ${widthClass}`} {...props}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-medium text-lg">Menu</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop sidebar */}
      <div className={`${classes} ${desktopClasses} ${widthClass} flex`} {...props}>
        <div className="p-4 overflow-y-auto h-full">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;