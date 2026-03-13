import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Sun, Moon, Bell, User, LogOut, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Link Scanner", path: "/link-scanner" },
  { label: "Image", path: "/image-detection" },
  { label: "Video", path: "/video-detection" },
  { label: "Audio", path: "/audio-detection" },
  { label: "Email", path: "/email-analysis" },
  { label: "Breach", path: "/breach-check" },
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

          {/* Desktop nav links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="ml-2 flex items-center gap-1">
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
        <nav className="liquid-nav flex gap-1 overflow-x-auto rounded-full border border-white/20 bg-card/40 px-3 py-2 shadow-lg shadow-primary/5 backdrop-blur-2xl dark:border-white/10 dark:bg-card/30">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavMobile"
                    className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </span>
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
