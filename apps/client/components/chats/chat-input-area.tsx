import React, { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

type ChatInputAreaProps = {
  input: string;
  isLoading: boolean;
  handleSendMessage: () => void;
  handleKeyPress: (e: KeyboardEvent<Element>) => void;
  setInput: Dispatch<SetStateAction<string>>;
};
export default function ChatInputArea({
  handleKeyPress,
  handleSendMessage,
  input,
  isLoading,
  setInput,
}: ChatInputAreaProps) {
  return (
    <div className="border-t border-border p-4">
      <div className="max-w-3xl mx-auto flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || input.trim() === ""}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-center text-muted-foreground mt-2">
        ChatGPT Clone can make mistakes. Consider checking important
        information.
      </p>
    </div>
  );
}
