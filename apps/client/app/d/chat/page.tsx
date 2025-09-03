"use client";

import { useState } from "react";

import ChatDesktopSidebar from "@/components/chats/chat-desktop-sidebar";
import ChatMobileSidebar from "@/components/chats/chat-mobile-sidebar";
import ChatMessages from "@/components/chats/chat-messages";
import ChatInputArea from "@/components/chats/chat-input-area";

// Mock data for chat history
const initialChats = [
  { id: 1, title: "How to learn React", date: "2 hours ago" },
  { id: 2, title: "Python programming tips", date: "Yesterday" },
  { id: 3, title: "Travel recommendations", date: "3 days ago" },
  { id: 4, title: "Cooking recipes", date: "Last week" },
];

// Mock messages for the chat
const initialMessages = [
  { id: 1, text: "Hello! How can I assist you today?", sender: "ai" },
  {
    id: 2,
    text: "I'm looking for help with my React project.",
    sender: "user",
  },
  {
    id: 3,
    text: "I'd be happy to help with your React project! What specific challenges are you facing?",
    sender: "ai",
  },
];

export default function ChatPage() {
  const [chats, setChats] = useState(initialChats);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const newUserMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages([...messages, newUserMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const newAIMessage = {
        id: Date.now() + 1,
        text: "I understand your question. Let me think about the best way to help you with that.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, newAIMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New conversation",
      date: "Just now",
    };
    setChats([newChat, ...chats]);
    setMessages([]);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for desktop */}
      <ChatDesktopSidebar
        chats={chats}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        createNewChat={createNewChat}
      />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        {/* Mobile header with sidebar trigger and title */}
        <ChatMobileSidebar chats={chats} createNewChat={createNewChat} />

        {/* Chat messages */}
        <ChatMessages isLoading={isLoading} messages={messages} />

        {/* Input area */}
        <ChatInputArea
          handleKeyPress={handleKeyPress}
          handleSendMessage={handleSendMessage}
          input={input}
          isLoading={isLoading}
          setInput={setInput}
        />
      </main>
    </div>
  );
}
