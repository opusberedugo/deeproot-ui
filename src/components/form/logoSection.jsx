// LogoSection.js
export default function LogoSection({ src, alt, title }) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img alt={alt} src={src} className="mx-auto h-10 w-auto" />
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
  );
}
