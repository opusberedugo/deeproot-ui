// AI Message Component
const AIMessage = ({ content }) => {
  return (
    <div className="flex mb-4">
      <div className="bg-gray-800 text-white p-3 rounded-lg max-w-[80%]">
        {content}
      </div>
    </div>
  );
};

export default AIMessage;
// This component is used to display messages from the AI in the chat interface.