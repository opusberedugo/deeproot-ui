  import React from 'react';
import ChatContainer from '../../components/chat/ChatContainer';
import MessageList from '../../components/chat/MessageList';
import MessageInput from '../../components/chat/MessageInput';
import Sidebar from '../../components/layout/Sidebar';

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatContainer>
        <MessageList messages={[]} />
        <MessageInput />
      </ChatContainer>
    </div>
  );
}

