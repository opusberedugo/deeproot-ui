export default function Input({ 
  id, 
  type, 
  placeholder, 
  value, 
  onChange, 
  onBlur,  // Make sure onBlur is included
  name, 
  required 
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}  // Make sure onBlur is handled
    />
  );
}