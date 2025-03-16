// SignUpLink.jsx- This is the component at the bottom of the form that allows the user to switch between the sign-up and sign-in forms. It takes two props, text and href, which are the text to display and the link to switch to, respectively.
export default function FormSwitcher({ text, href, cta }) {
  return (
    <p className="mt-10 text-center text-sm/6 text-gray-500">
      {text}{' '}
      <a href={href} className="font-semibold text-indigo-600 hover:text-indigo-500">
        {cta}
      </a>
    </p>
  );
}