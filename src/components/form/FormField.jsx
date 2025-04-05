// src/components/form/FormField.jsx - Update this file
import Label from "../common/Label";
import Input from "../common/input";
import ForgotLink from "../common/ForgotLink";
import ErrorLabel from "../common/ErrorLabel";

export default function FormField({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  onBlur,  // Make sure onBlur is included
  name, 
  required, 
  error = "", 
  showForgot, 
  forgotLinkText, 
  forgotHref 
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        {label && <Label id={id} text={label} />}
        {showForgot && <ForgotLink linkText={forgotLinkText} href={forgotHref} />}
      </div>
      <div className="mt-2">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}  // Make sure onBlur is passed to Input
          name={name}
          required={required}
        />
        {/* Always render ErrorLabel with the error text */}
        <ErrorLabel text={error} />
      </div>
    </div>
  );
}