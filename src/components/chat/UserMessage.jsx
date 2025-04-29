// User Message Component
const UserMessage = ({ content }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-indigo-600 text-white p-3 rounded-lg max-w-[80%] shadow-sm">
        {content}
      </div>
    </div>
  );
};

export default UserMessage;