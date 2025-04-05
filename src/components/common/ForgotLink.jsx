export default function ForgotLink({ linkText, href }) {
  return (
    <div className="text-sm">
      <a href={href} className="font-semibold text-indigo-600 hover:text-indigo-500">
        {linkText}
      </a>
    </div>
  );
}