// AI Message Component
const AIMessage = ({ content }) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white text-gray-800 p-3 rounded-lg max-w-[80%] shadow-sm border border-gray-200">
        {content}
      </div>
    </div>
  );
};

export default AIMessage;