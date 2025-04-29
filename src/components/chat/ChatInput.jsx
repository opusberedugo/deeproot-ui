import React, { useState, useRef } from 'react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="border-t border-gray-200 px-6 py-6 bg-white">
      <form onSubmit={handleSendMessage} className="flex items-center rounded-full border border-gray-300 p-2">
        {/* Plus Button */}
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        
        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isLoading ? "Processing..." : "Message Deeproot"}
          className="flex-1 bg-transparent outline-none px-3 py-2 text-gray-700 placeholder-gray-500"
          disabled={isLoading}
        />
        
        <div className="flex space-x-1">
          {/* Settings Button */}
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          {/* Microphone Button */}
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          
          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className={`p-2 rounded-full ${
              !message.trim() || isLoading ? 'bg-gray-200 text-gray-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            } transition-colors`}>
            
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10L1 19L19 10L1 1L3 10ZM3 10H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </form>
      
      {/* Footer Text */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        Deeproot uses AI. Check for mistakes. Conversations are used to train AI and Deeproot can learn about your interests.
      </div>
    </div>
  );
};

export default ChatInput;