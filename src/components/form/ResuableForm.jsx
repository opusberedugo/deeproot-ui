import { useState } from "react";
import FormField from "./FormField";
import Form from "./Form";
import FormSwitcher from "../common/FormSwitcher";

export default function ReusableForm({ 
  fields = [], 
  onSubmitHandler, 
  switcher, 
  isSubmitting = false,
  submitButtonText = "Submit",
  noValidate = true  // Add prop to disable HTML default validation
}) {
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prevent default form validation
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    
    // Check if the fields already have values from props
    // This is useful when the parent component manages form state
    const fieldValues = fields.reduce((acc, field) => {
      // Use field value from props if available, otherwise use local state
      acc[field.name] = field.value !== undefined ? field.value : formData[field.name];
      return acc;
    }, {});
    
    // Only perform validation if the parent didn't pass onChange/onBlur handlers
    // (which indicates the parent is handling validation)
    const parentHandlesValidation = fields.some(field => field.onChange || field.onBlur);
    
    if (!parentHandlesValidation) {
      const newErrors = {};
      fields.forEach((field) => {
        if (field.required && !fieldValues[field.name]) {
          newErrors[field.name] = `${field.label || "This field"} is required`;
        }
      });
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length > 0) {
        console.log("Form has validation errors:", newErrors);
        return; // Don't submit if there are errors
      }
    }

    console.log("Form submitted with data:", fieldValues);
    
    // Check if onSubmitHandler is a function
    if (typeof onSubmitHandler === "function") {
      // Call the onSubmit function passed as a prop
      onSubmitHandler(e);
    } else if (typeof onSubmitHandler === "object" && onSubmitHandler !== null) {
      // If it's an object, call the onSubmit method of the object
      if (onSubmitHandler.onSubmit) {
        onSubmitHandler.onSubmit(fieldValues);
      } else {
        console.log("onSubmitHandler object doesn't have an onSubmit method");
      }
    } else {
      console.log("No valid onSubmit function provided.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate={noValidate}>
      {fields.map((field) => {
        // Use the field's own props if present (for parent-controlled components)
        // or fall back to the local state
        const fieldProps = {
          ...field,
          value: field.value !== undefined ? field.value : formData[field.name],
          onChange: field.onChange || handleChange,
          error: field.error !== undefined ? field.error : errors[field.name]
        };
        
        return (
          <FormField
            key={field.name}
            {...fieldProps}
          />
        );
      })}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {submitButtonText}
        </button>
      </div>

      {switcher && <FormSwitcher {...switcher} />}
    </Form>
  );
}