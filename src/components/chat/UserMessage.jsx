// User Message Component
const UserMessage = ({ content }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[80%]">
        {content}
      </div>
    </div>
  );
};

export default UserMessage;