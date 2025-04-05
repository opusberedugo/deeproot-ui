// src/pages/LoginPage.jsx - Update this file with final implementation
import LogoSection from "../components/common/LogoSection";
import ReusableForm from "../components/form/ResuableForm";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation/Navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Debug errors when they change
  useEffect(() => {
    console.log("Current login form errors:", errors);
  }, [errors]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ) {
          error = "Invalid email address";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field immediately
    const errorMessage = validateField(name, value);
    
    // Log for debugging
    console.log(`Field ${name} changed to "${value}", validation error: "${errorMessage}"`);
    
    // Update errors state
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const errorMessage = validateField(name, formData[name]);
    console.log(`Field ${name} blurred, validation error: "${errorMessage}"`);
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const newErrors = {};
    Object.keys(formData).forEach(name => {
      newErrors[name] = validateField(name, formData[name]);
    });
    
    setErrors(newErrors);
    console.log("Login form submission validation errors:", newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      console.log("Login form submitted successfully:", formData);
      // Here you would typically send the data to your backend
    } else {
      console.log("Login form has validation errors, not submitting");
    }
  };

  return (
    <>
      <Navigation 
        links={[
          { text: "Home", href: "/" },
          { text: "Features", href: "/features" },
          { text: "Team", href: "/team" },
        ]}
        authLinks={[
          { text: "Login", href: "/login" },
          { text: "Sign Up", href: "/signup", type: "primary" },
        ]}
      />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <LogoSection
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Workflow"
          title="Sign in to your account" 
        />
        <ReusableForm
          onSubmit={handleSubmit}
          fields={[
            {
              id: "email",
              label: "Email Address",
              type: "email",
              placeholder: "Enter email",
              name: "email",
              required: true,
              value: formData.email,
              onChange: handleChange,
              onBlur: handleBlur,
              error: errors.email || "",
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter password",
              name: "password",
              required: true,
              value: formData.password,
              onChange: handleChange,
              onBlur: handleBlur,
              error: errors.password || "",
              showForgot: true,
              forgotLinkText: "Forgot password?",
              forgotHref: "/reset",
            },
          ]}
          switcher={{ text: "Not a member?", href: "/signup", cta: "Sign up now" }} 
        />
      </div>
    </>
  );
}