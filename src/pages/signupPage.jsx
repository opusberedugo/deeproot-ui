import ReusableForm from "../components/form/ResuableForm";
import LogoSection from "../components/common/LogoSection";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation/Navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  // Debug errors when they change
  useEffect(() => {
    console.log("Current form errors:", errors);
  }, [errors]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fname":
        if (!value) error = "First name is required";
        else if (value.length < 3) error = "First name must be at least 3 characters";
        else if (!/^[A-Za-z]+$/.test(value)) error = "First name must contain only letters";
        break;
      case "lname":
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

  const handleChange = ({ target: { name, value } }) => {
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field immediately
    const errorMessage = validateField(name, value);
    
    // Log for debugging
    console.log(`Field ${name} changed to "${value}", validation error: "${errorMessage}"`);
    
    // Update errors state
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleBlur = ({ target: { name } }) => {
    const errorMessage = validateField(name, formData[name]);
    console.log(`Field ${name} blurred, validation error: "${errorMessage}"`);
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach(name => {
      newErrors[name] = validateField(name, formData[name]);
    });

    setErrors(newErrors);
    console.log("Form submission validation errors:", newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      console.log("Form submitted successfully:", formData);
      // Here you would typically send the data to your backend
    } else {
      console.log("Form has validation errors, not submitting");
    }
  };

  const formFields = [
    {
      id: "fname",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      name: "fname",
      required: true,
      value: formData.fname,
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.fname || ""
    },
    {
      id: "lname",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      name: "lname",
      required: true,
      value: formData.lname,
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.lname || ""
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter email e.g email@example.com",
      name: "email",
      required: true,
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
      required: true,
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
        <ReusableForm
          onSubmit={handleSubmit}
          fields={formFields}
          switcher={{
            text: "Already a member?",
            href: "/login",
            cta: "Log in now"
          }}
        />
      </div>
    </>
  );
}