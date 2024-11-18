"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 ">
      <div className="w-full flex-1">
        <MobileNav />
        <form className="hidden md:block">
          <div className="relative w-[450px]">
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
              <svg
                className="flex-shrink-0 size-4 text-gray-400 dark:text-white/60"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <Input
              type="text"
              className="py-2 ps-10 pe-16 block w-full bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-200 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
              placeholder="Search or Type a Command"
            />
            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
              <svg
                className="flex-shrink-0 size-3 text-gray-400 dark:text-white/60"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span className="mx-1">
                <svg
                  className="flex-shrink-0 size-3 text-gray-400 dark:text-white/60"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </span>
              <span className="text-xs">k</span>
            </div>
          </div>
        </form>
      </div>
      <Button className="md:hidden" variant="outline" size="icon">
        <svg
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span className="sr-only">Search</span>
      </Button>
      <ModeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Navbar;
