import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  Sun,
  Moon,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  Link as LinkIcon,
  Image,
  Video,
  Mic,
  Mail,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navLinks = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Link Scanner", path: "/link-scanner", icon: LinkIcon },
  { label: "Image Detection", path: "/image-detection", icon: Image },
  { label: "Video Detection", path: "/video-detection", icon: Video },
  { label: "Audio Detection", path: "/audio-detection", icon: Mic },
  { label: "Email Analysis", path: "/email-analysis", icon: Mail },
  { label: "Breach Check", path: "/breach-check", icon: ShieldAlert },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Floating liquid glass navbar */}
      <div className="sticky top-0 z-50 flex justify-center px-4 pt-4">
        <nav className="liquid-nav flex items-center gap-1 rounded-full border border-white/20 bg-card/40 px-3 py-2 shadow-lg shadow-primary/5 backdrop-blur-2xl dark:border-white/10 dark:bg-card/30">
          {/* Logo */}
          <Link to="/dashboard" className="mr-2 flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden font-display text-lg font-bold text-foreground sm:inline">
              CyberShield
            </span>
          </Link>

          {/* Desktop nav links - icons only */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Tooltip key={link.path}>
                  <TooltipTrigger asChild>
                    <Link
                      to={link.path}
                      className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/20"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Icon
                        className={`relative z-10 h-4 w-4 ${
                          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    {link.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-1 hidden h-5 w-px bg-border/50 md:block" />

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 rounded-full text-muted-foreground"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 rounded-full text-muted-foreground"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyber-red" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-muted-foreground"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>

      {/* Mobile floating bottom nav */}
      <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center md:hidden">
        <nav className="liquid-nav flex gap-1 rounded-full border border-white/20 bg-card/40 px-3 py-2 shadow-lg shadow-primary/5 backdrop-blur-2xl dark:border-white/10 dark:bg-card/30">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative flex h-9 w-9 items-center justify-center rounded-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavMobile"
                    className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  className={`relative z-10 h-4 w-4 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 pb-24 md:pb-6">{children}</main>
    </div>
  );
};

export default Layout;
