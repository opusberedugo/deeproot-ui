import React, { useState, useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import AIMessage from './AIMessage';
import DocumentAttachment from './DocumentAttachment';
import ChatInput from './ChatInput';

const ChatContainer = () => {
  // Sample initial conversation
  const [messages, setMessages] = useState([
    { type: 'user', content: "I've made some changes. what's improved and how can it be better" },
    { type: 'ai', content: "Your revisions have strengthened several aspects of your research document, making it more structured and insightful. Here's what has improved and areas where further refinement could enhance your work:" }
  ]);
  
  const [showDocument, setShowDocument] = useState(true); // For the document attachment
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = (messageText) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: messageText }]);
    
    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      const aiResponse = "I've analyzed your request. Your changes have improved the document's structure and clarity. To make it even better, consider adding more specific examples and strengthening the conclusion with actionable insights.";
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen px-6 bg-gray-900">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          msg.type === 'user' ? (
            <UserMessage key={index} content={msg.content} />
          ) : (
            <AIMessage key={index} content={msg.content} />
          )
        ))}
        
        {/* Document Attachment (as seen in the image) */}
        {showDocument && (
          <div className="flex justify-end mb-4">
            <DocumentAttachment 
              title="MY RESEARCH DOCUMENT.docx" 
              type="Doc" 
            />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;