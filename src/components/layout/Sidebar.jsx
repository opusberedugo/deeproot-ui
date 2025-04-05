export default function Sidebar({ children }) {
  return (
    <div className="flex flex-col w-64 h-full bg-gray-800 text-white">
      {children}
    </div>
  );
};