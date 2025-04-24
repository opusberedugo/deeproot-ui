import React, { useState } from 'react';
import Container from './Container';

/**
 * Header component that follows the deeproot-ui design pattern
 * @param {object} props - Component props
 * @param {string} props.title - Header title
 * @param {React.ReactNode} props.logo - Logo component or element
 * @param {React.ReactNode} props.actions - Actions to display on the right
 * @param {boolean} props.sticky - Whether header is sticky
 * @param {boolean} props.hasShadow - Whether header has shadow
 * @param {string} props.className - Additional CSS classes
 */
const Header = ({
  title,
  logo,
  actions,
  sticky = false,
  hasShadow = true,
  className = '',
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Base classes
  const baseClasses = 'bg-white border-b border-gray-200';
  
  // Shadow classes
  const shadowClasses = hasShadow ? 'shadow-sm' : '';
  
  // Sticky classes
  const stickyClasses = sticky ? 'sticky top-0 z-40' : '';
  
  // Combined classes
  const classes = `${baseClasses} ${shadowClasses} ${stickyClasses} ${className}`;
  
  return (
    <header className={classes} {...props}>
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <div className="flex items-center">
            {logo && (
              <div className="flex-shrink-0">
                {logo}
              </div>
            )}
            {title && (
              <h1 className={`${logo ? 'ml-3' : ''} text-xl font-semibold text-gray-800`}>
                {title}
              </h1>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Actions */}
          <div className="hidden md:flex md:items-center">
            {actions}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200">
            <div className="px-2 space-y-2">
              {actions}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;