// Document Attachment Component (as seen in the image)
const DocumentAttachment = ({ title, type }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-3 flex items-center space-x-3 mb-4 max-w-sm">
      <div className="p-2 bg-gray-700 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-gray-400">{type}</p>
      </div>
    </div>
  );
};

export default DocumentAttachment;
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12h4m0 0h-4m0 0H7m8 0v8m0-8V5m0 7l3-3m-3 3l-3-3" />