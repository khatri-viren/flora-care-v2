import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Book,
  FileClock,
  Home,
  Menu,
  Server,
  Settings,
  UserCheck,
  Users2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <Link
          href="/"
          className="font-bold font-hind text-2xl text-accent-foreground"
        >
          FloraCare
        </Link>
        <nav className="grid gap-2 text-lg font-medium mt-6">
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
        </nav>

        <div className="mt-auto">
          <Button size="sm" className="w-full">
            Profile Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
