import ReusableForm from "../components/form/ResuableForm";
import LogoSection from "../components/form/logoSection";
import { useState } from "react";

export default function SignupPage() {
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LogoSection
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Workflow"
        title="Create your account"
      />
      <ReusableForm
        onSubmit={handleSubmit}
        fields={[
          {
            id: "fname",
            label: "First Name",
            type: "text",
            placeholder: "Enter first name",
            name: "fname",
            required: true,
            value: formData.fname,
            onChange: (e) => setFormData({ ...formData, fname: e.target.value }),
            error: errors.fname,
          },
          {
            id: "lname",
            label: "Last Name",
            type: "text",
            placeholder: "Enter last name",
            name: "lname",
            required: true,
            value: formData.lname,
            onChange: (e) => setFormData({ ...formData, lname: e.target.value }),
            error: errors.lname,
          },
          {
            id: "email",
            label: "Email Address",
            type: "email",
            placeholder: "Enter email e.g email@example.com",
            name: "lname",
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
          },
        ]}
        switcher={{ text: "Already a member?", href: "/login", cta: "Log in now" }}
      />
    </div>
  );
}