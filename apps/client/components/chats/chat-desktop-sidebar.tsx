import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Cannabis,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type ChatDesktopSidebarProps = {
  chats: {
    id: number;
    title: string;
    date: string;
  }[];

  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  createNewChat: () => void;
};

export default function ChatDesktopSidebar({
  chats,
  isDropdownOpen,
  setIsDropdownOpen,
  createNewChat,
}: ChatDesktopSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-muted/20">
      {/* Website Title */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 text-lg font-medium">
          <div className="bg-primary text-primary-foreground rounded-full p-1">
            <Cannabis className="h-4 w-4" />
          </div>
          ChatGPT Clone
        </div>
      </div>

      <div className="p-4">
        <Button onClick={createNewChat} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 p-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium truncate">{chat.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {chat.date}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User info with dropdown */}
      <div className="p-4 border-t border-border">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between h-auto py-2"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Free Plan</p>
                </div>
              </div>
              {isDropdownOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56 mb-2">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/billing" className="cursor-pointer">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
