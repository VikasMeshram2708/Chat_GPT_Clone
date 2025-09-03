"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cannabis, Menu, MessageSquare, CreditCard, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navigation = [
    { name: "Chat", href: "/d/chat", icon: MessageSquare },
    { name: "Pricing", href: "/p/pricing", icon: CreditCard },
    { name: "About", href: "/p/about", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-medium hover:opacity-80 transition-opacity"
            >
              <div className="bg-primary text-primary-foreground rounded-full p-1.5">
                <Cannabis className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span>ChatGPT</span>
              <span className="italic">Clone</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  asChild
                  className="gap-1"
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                {/* Visually hidden title for accessibility */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="flex flex-col gap-8 py-8">
                  {/* Logo */}
                  <div className="flex items-center gap-2 px-4">
                    <div className="bg-primary text-primary-foreground rounded-full p-1.5">
                      <Cannabis className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-medium">ChatGPT Clone</span>
                  </div>

                  {/* Navigation links */}
                  <div className="grid gap-2">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SheetClose asChild key={item.name}>
                          <Button
                            variant={
                              pathname === item.href ? "secondary" : "ghost"
                            }
                            asChild
                            className="w-full justify-start gap-2 py-6"
                          >
                            <Link href={item.href}>
                              <Icon className="h-5 w-5" />
                              {item.name}
                            </Link>
                          </Button>
                        </SheetClose>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
