import React from 'react';

export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div key={index} className="mb-2">
          <div className="text-sm text-gray-500">{message.sender}</div>
          <div className="text-lg">{message.text}</div>
        </div>
      ))}
    </div>
  );
}