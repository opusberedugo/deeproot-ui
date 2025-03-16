import Form from "../components/form/form";
import LogoSection from "../components/form/logoSection";
import ReusableForm from "../components/form/ResuableForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <LogoSection src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Workflow" title="Sign in to your account" />
        <ReusableForm
          onSubmit={()=>{console.log("Form submitted")}}
          fields={[
            { id: "email", label: "Email Address", type: "email", placeholder: "Enter email", name: "email", required: true },
            { id: "password", label: "Password", type: "password", placeholder: "Enter password", name: "password", required: true, forgotLink: { text: "Forgot password?", href: "/reset" } }
          ]}
          switcher={{ text: "Not a member?", href: "/signup", cta: "Sign up now" }}
        />
      {/* <Form /> */}
    </div>
  );
}