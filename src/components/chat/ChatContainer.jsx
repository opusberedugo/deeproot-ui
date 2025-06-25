import React, { useState, useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import AIMessage from './AIMessage';
import DocumentAttachment from './DocumentAttachment';
import ChatInput from './ChatInput';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages when component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const userId = sessionStorage.getItem('userId');
      
      if (!userId) {
        setError('User not authenticated. Please log in.');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(`http://localhost:3001/api/${userId}/messages`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      
      // Transform the API response to match your component's expected format
      const transformedMessages = data.result.map(msg => ({
        type: msg.to === 'AI' ? 'user' : 'ai',
        content: msg.message,
        timestamp: new Date(msg.date).toISOString(),
        id: msg._id
      }));
      
      setMessages(transformedMessages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages. Please try again later.');
      setIsLoading(false);
    }
  };

  // Handle sending a new message
  const handleSendMessage = async (messageText) => {
    try {
      const userId = sessionStorage.getItem('userId');
      
      if (!userId) {
        setError('User not authenticated. Please log in.');
        return;
      }
      
      setIsLoading(true);
      
      // Optimistically add user message to UI
      setMessages(prev => [...prev, { 
        type: 'user', 
        content: messageText,
        timestamp: new Date().toISOString()
      }]);
      
      // Send message to the correct API endpoint
      const response = await fetch(`http://localhost:3001/api/chat/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: messageText
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // Get the updated messages (including the AI response)
      const data = await response.json();
      
      // Update state with the latest messages from the server
      if (Array.isArray(data)) {
        setMessages(data);
      } else if (data && data.message) {
        // If the API returns just the new message, add it to the existing messages
        setMessages(prev => [...prev, {
          type: 'ai',
          content: data.message,
          timestamp: new Date().toISOString()
        }]);
      } else {
        // If we can't determine the structure, refetch all messages
        fetchMessages();
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 border-l border-gray-200">
      {/* Error message display */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 text-center border-b border-red-200">
          {error}
          <button 
            className="ml-2 text-red-700 font-medium underline"
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !isLoading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            msg.type === 'user' ? (
              <UserMessage key={index} content={msg.content} />
            ) : (
              <AIMessage key={index} content={msg.content} />
            )
          ))
        )}
        
        {/* Loading indicator inside message area */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;