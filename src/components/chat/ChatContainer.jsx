export default function ChatContainer({ children }) {
  return (
    <div className="flex flex-col flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
      {children}
    </div>
  );
}