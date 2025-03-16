import Navigation from "../components/navigation";

export default function TeamPage() {
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Our Team</h1>
      <p>Meet the talented team behind our platform.</p>
    </div>
    </>
  );
}