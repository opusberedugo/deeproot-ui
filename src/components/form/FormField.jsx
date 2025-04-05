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
          name={name}
          required={required}
        />
        {/* Always render ErrorLabel, even if no error */}
        <ErrorLabel text={error} />
      </div>
    </div>
  );
}
