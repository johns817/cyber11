"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Terminal,
  Zap,
  BookOpen,
  Trophy,
  Users,
  MessageSquare,
  Settings,
  CreditCard,
  User,
  Shield,
  Award,
  Swords,
  Monitor,
  Wrench,
} from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/labs", label: "Labs", icon: Terminal },
  { href: "/rooms", label: "Rooms", icon: Monitor },
  { href: "/challenges", label: "Challenges", icon: Zap },
  { href: "/paths", label: "Learning Paths", icon: BookOpen },
  { href: "/certifications", label: "Certifications", icon: Award },
  { href: "/compete", label: "Compete", icon: Swords },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/community", label: "Community", icon: MessageSquare },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/subscription", label: "Subscription", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Shield className="h-7 w-7 text-cyber-purple" />
        <span className="text-lg font-bold bg-gradient-to-r from-cyber-purple to-cyber-blue bg-clip-text text-transparent">
          CyberQuest
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-sidebar-foreground/70 hover:bg-muted hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
