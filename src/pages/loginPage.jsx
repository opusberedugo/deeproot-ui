import Form from "../components/form/form";
import LogoSection from "../components/form/logoSection";
import ReusableForm from "../components/form/ResuableForm";
import { useState } from "react";
import Navigation from "../components/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted", formData);
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
        title="Sign in to your account" />
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
            onChange: (e) => setFormData({ ...formData, email: e.target.value }),
            error: errors.email,
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter password",
            name: "password",
            required: true,
            value: formData.password,
            onChange: (e) => setFormData({ ...formData, password: e.target.value }),
            error: errors.password,
            forgotLink: { text: "Forgot password?", href: "/reset" },
          },
        ]}
        switcher={{ text: "Not a member?", href: "/signup", cta: "Sign up now" }} />
    </div></>
  );
}