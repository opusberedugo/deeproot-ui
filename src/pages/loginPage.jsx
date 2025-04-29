// src/pages/LoginPage.jsx - Updated implementation
import LogoSection from "../components/common/LogoSection";
import ReusableForm from "../components/form/ResuableForm";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation/Navigation";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent default form validation
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    
    // Validate all fields on submit
    const newErrors = {};
    Object.keys(formData).forEach(name => {
      newErrors[name] = validateField(name, formData[name]);
    });
    
    setErrors(newErrors);
    console.log("Login form submission validation errors:", newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      console.log("Login form validated successfully, attempting login:", formData);
      
      // Set submitting state
      setIsSubmitting(true);
      
      try {
        // Call the server endpoint for login
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          console.log("Login successful:", data);
          
          // Update server response state
          setServerResponse({
            success: true,
            data: data
          });
          
          // Store user ID in sessionStorage
          if (data.result && data.result._id) {
            sessionStorage.setItem('userId', data.result._id);
            console.log("User ID stored in session storage:", data.result._id);
          }
          
          // Store other user information if needed
          if (data.result) {
            sessionStorage.setItem('userEmail', data.result.email);
            sessionStorage.setItem('userFirstname', data.result.firstname);
            sessionStorage.setItem('userLastname', data.result.lastname);
          }
          
          // Show success message briefly before redirecting
          setTimeout(() => {
            // Redirect to app after successful login
            navigate('/app');
          }, 1000);
        } else {
          console.error("Login failed:", data);
          
          // Update server response state
          setServerResponse({
            success: false,
            error: data.error
          });
          
          // Set error message from server
          setErrors(prev => ({ 
            ...prev, 
            server: data.error || "Invalid email or password" 
          }));
        }
      } catch (error) {
        console.error("Error during login:", error);
        
        // Update server response state
        setServerResponse({
          success: false,
          error: error.message
        });
        
        // Set network error message
        setErrors(prev => ({ 
          ...prev, 
          server: "Network error. Please try again later." 
        }));
      } finally {
        setIsSubmitting(false);
      }
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
        
        {/* Server error display */}
        {errors.server && (
          <div className="max-w-md w-full mx-auto mt-2">
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{errors.server}</span>
            </div>
          </div>
        )}
        
        {/* Success message display */}
        {serverResponse && serverResponse.success && (
          <div className="max-w-md w-full mx-auto mt-2">
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success! </strong>
              <span className="block sm:inline">Login successful. Redirecting to app...</span>
            </div>
          </div>
        )}
        
        <ReusableForm
          onSubmitHandler={handleSubmit}
          isSubmitting={isSubmitting}
          submitButtonText={isSubmitting ? "Logging in..." : "Sign in"}
          noValidate={true} // Explicitly disable HTML5 validation
          fields={[
            {
              id: "email",
              label: "Email Address",
              type: "email",
              placeholder: "Enter email",
              name: "email", // Consistent with backend expectations
              required: false, // Disable HTML5 validation
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
              name: "password", // Consistent with backend expectations
              required: false, // Disable HTML5 validation
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