export default function Input({ id, type, placeholder, value, onChange, name, required }) {
  return (
    <input
      id={id}
      onChange={onChange}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
    />
  );
}