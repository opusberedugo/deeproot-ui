// src/pages/SignupPage.jsx - Updated implementation
import ReusableForm from "../components/form/ResuableForm";
import LogoSection from "../components/common/LogoSection";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation/Navigation";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);

  // Debug errors when they change
  useEffect(() => {
    console.log("Current form errors:", errors);
  }, [errors]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstname":
        if (!value) error = "First name is required";
        else if (value.length < 3) error = "First name must be at least 3 characters";
        else if (!/^[A-Za-z]+$/.test(value)) error = "First name must contain only letters";
        break;
      case "lastname":
        if (!value) error = "Last name is required";
        else if (value.length < 3) error = "Last name must be at least 3 characters";
        else if (!/^[A-Za-z]+$/.test(value)) error = "Last name must contain only letters";
        break;
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
        } else if (!/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
          error = "Password must contain at least one uppercase letter and one number";
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

    const newErrors = {};
    Object.keys(formData).forEach(name => {
      newErrors[name] = validateField(name, formData[name]);
    });

    setErrors(newErrors);
    console.log("Form submission validation errors:", newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      console.log("Form submitted successfully:", formData);
      setIsSubmitting(true);
      
      try {
        // Call the server endpoint
        const response = await fetch('http://localhost:3001/api/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        
        setServerResponse({
          success: response.ok,
          data: data
        });
        
        if (response.ok) {
          console.log("User added successfully:", data);
          
          // Set a short delay before redirecting to show success message briefly
          setTimeout(() => {
            // Redirect to login page after successful signup
            navigate('/login');
          }, 1500);
        } else {
          console.error("Failed to add user:", data);
          setErrors(prev => ({ 
            ...prev, 
            server: data.message || "Failed to add user" 
          }));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors(prev => ({ 
          ...prev, 
          server: "Network error. Please try again later." 
        }));
        setServerResponse({
          success: false,
          error: error.message
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Form has validation errors, not submitting");
    }
  };

  const formFields = [
    {
      id: "firstname",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      name: "firstname",
      required: false, // Disable HTML5 validation
      value: formData.firstname,
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.firstname || ""
    },
    {
      id: "lastname",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      name: "lastname",
      required: false, // Disable HTML5 validation
      value: formData.lastname,
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.lastname || "" // Fixed this from errors.lname to errors.lastname
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter email e.g email@example.com",
      name: "email",
      required: false, // Disable HTML5 validation
      value: formData.email,
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.email || ""
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      name: "password",
      required: false, // Disable HTML5 validation
      value: formData.password,
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.password || ""
    }
  ];

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
          title="Create your account"
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
              <span className="block sm:inline">Your account has been created successfully. Redirecting to login page...</span>
            </div>
          </div>
        )}
        
        <ReusableForm
          onSubmitHandler={handleSubmit}
          fields={formFields}
          switcher={{
            text: "Already a member?",
            href: "/login",
            cta: "Log in now"
          }}
          isSubmitting={isSubmitting}
          submitButtonText={isSubmitting ? "Signing up..." : "Sign Up"}
          noValidate={true} // Added this to explicitly disable HTML5 validation
        />
      </div>
    </>
  );
}