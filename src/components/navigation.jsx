import { useState } from "react";
import { Dialog, DialogPanel, Popover, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function Navigation({
  dialogTitle, // String: Title displayed in the mobile dialog
  dialogContent, // JSX: Content inside the mobile dialog
  links = [], // Array: [{ text: "Home", href: "/home" }] for navigation links
  authLinks = [], // Array: [{ text: "Login", href: "/login", type: "primary" }] for authentication buttons
  logoUrl = "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600", // Logo URL
  logoAlt = "Company Logo", // Alt text for the logo
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img src={logoUrl} alt={logoAlt} className="h-8 w-auto" />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            aria-label="Open main menu"
          >
            <Bars3Icon className="size-6" />
          </button>
        </div>

        {/* Navigation Links (Hidden if empty) */}
        {links.length > 0 && (
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => 
                  `text-sm font-semibold ${isActive ? 'text-blue-600' : 'text-gray-900'} cursor-pointer`
                }
                end
              >
                {link.text}
              </NavLink>
            ))}
          </PopoverGroup>
        )}

        {/* Authentication Links (Hidden if empty) */}
        {authLinks.length > 0 && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            {authLinks.map((auth) => (
              <NavLink
                key={auth.href}
                to={auth.href}
                className={({ isActive }) => 
                  `text-sm px-6 py-3 rounded-md font-semibold cursor-pointer ${
                    auth.type === "primary"
                      ? "bg-blue-800 text-white"
                      : isActive 
                        ? "border-2 border-blue-700 text-blue-800 bg-blue-50" 
                        : "border-2 border-blue-500 text-blue-800"
                  }`
                }
              >
                {auth.text}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{dialogTitle}</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 p-2.5 text-gray-700"
              aria-label="Close menu"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          {/* Dialog Content */}
          <div className="mt-6">{dialogContent}</div>

          {/* Mobile Menu Links (Hidden if empty) */}
          {links.length > 0 && (
            <div className="mt-6">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) => 
                    `block px-3 py-2 text-base font-semibold ${
                      isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-900 hover:bg-gray-50'
                    } cursor-pointer`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          )}

          {/* Mobile Auth Links (Hidden if empty) */}
          {authLinks.length > 0 && (
            <div className="mt-6 flex flex-col gap-4">
              {authLinks.map((auth) => (
                <NavLink
                  key={auth.href}
                  to={auth.href}
                  className={({ isActive }) => 
                    `block px-6 py-3 text-center rounded-md font-semibold cursor-pointer ${
                      auth.type === "primary"
                        ? "bg-blue-800 text-white"
                        : isActive 
                          ? "border-2 border-blue-700 text-blue-800 bg-blue-50" 
                          : "border-2 border-blue-500 text-blue-800"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {auth.text}
                </NavLink>
              ))}
            </div>
          )}
        </DialogPanel>
      </Dialog>
    </header>
  );
}