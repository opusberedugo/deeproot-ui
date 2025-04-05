  import React from 'react';
import ChatContainer from '../../components/chat/ChatContainer';
import MessageList from '../../components/chat/MessageList';
import MessageInput from '../../components/chat/MessageInput';
import Sidebar from '../../components/layout/Sidebar';
import ChatInput from '../../components/chat/ChatInput';

export default function ChatPage() {
  return (
    <div className="flex min-w-full h-screen">
      <Sidebar />
      <ChatContainer>
        <MessageList messages={[]} />
        <ChatInput />
      </ChatContainer>
    </div>
  );
}

