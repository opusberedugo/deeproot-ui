import Form from "./form";
import Input from "./input";
import Label from "./label";
import ErrorLabel from "./errorLabel";
import ForgotLink from "./forgotLink";
import FormSwitcher from "./FormSwitcher";
import React from "react";

export default function ReusableForm({
  onSubmit,
  fields = [], // Array of field objects { id, label, type, placeholder, name, required, error, forgotLink }
  switcher, // { text, href, cta }
}) {
  return (
    <Form onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          {field.label && <Label text={field.label} id={field.id} />}
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            required={field.required}
            value={field.value}
            onChange={field.onChange}
          />
          {field.error && <ErrorLabel text={field.error} />}
          {field.forgotLink && (
            <ForgotLink linkText={field.forgotLink.text} href={field.forgotLink.href} />
          )}
        </div>
      ))}
      <div className="mt-6">
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </button>
      </div>
      {switcher && switcher.text && switcher.href && switcher.cta && (
        <FormSwitcher text={switcher.text} href={switcher.href} cta={switcher.cta} />
      )}
    </Form>
  );
}