"use client";
import {
  Bell,
  FileClock,
  Home,
  Image,
  ImageIcon,
  Server,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/"
            className="font-bold font-hind text-2xl text-accent-foreground"
          >
            FloraCare
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-3">
            <Link
              href="/"
              className={cn(
                `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-4`
              )}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`
              )}
            >
              <Settings className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/devices"
              className={cn(
                `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`
              )}
            >
              <Server className="h-4 w-4" />
              All Devices
            </Link>
            <Link
              href="/dashboard/pump-logs"
              className={cn(
                `flex items-center gap-3 rounded-lg px-3 text-muted-foreground py-2 transition-all hover:text-primary `
              )}
            >
              <FileClock className="h-4 w-4" />
              Pump Trigger Logs
            </Link>
            <Link
              href="/dashboard/image-analysis"
              className={cn(
                `flex items-center gap-3 rounded-lg px-3 text-muted-foreground py-2 transition-all hover:text-primary `
              )}
            >
              <ImageIcon className="h-4 w-4" />
              Image Analysis
            </Link>
            {/* <Link
              href="/ai-coaching"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              )}
            >
              <Users2 className="h-4 w-4" />
              AI Coaching
            </Link> */}
          </nav>
        </div>
      </div>
    </>
  );
}
