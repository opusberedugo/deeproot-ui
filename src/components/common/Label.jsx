export default function Label({ text, id }) {
  return <label htmlFor={id} className="block text-sm/6 font-medium text-gray-700">{text}</label>;
} 