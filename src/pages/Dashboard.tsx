import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Image,
  Mic,
  Mail,
  Link as LinkIcon,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  X,
  Plus,
  Sparkles,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const monitoredAccounts = [
  { name: "john.doe@gmail.com", score: 88, grade: "A" },
  { name: "john_doe (Instagram)", score: 72, grade: "B+" },
  { name: "johndoe@outlook.com", score: 95, grade: "A+" },
  { name: "john.doe (LinkedIn)", score: 64, grade: "C+" },
];

const overallGrade = "A-";
const overallScore = 80;

const recentNotifications = [
  { id: 1, type: "danger", message: "Password found in a recent data breach — change it now.", time: "2h ago" },
  { id: 2, type: "warning", message: "Suspicious login attempt on Instagram from unknown device.", time: "5h ago" },
  { id: 3, type: "info", message: "Monthly report ready. Score improved +4 pts.", time: "1d ago" },
];

const breachSourceData = [
  { name: "Social Media", value: 35 },
  { name: "Email", value: 25 },
  { name: "Shopping", value: 20 },
  { name: "Finance", value: 10 },
  { name: "Other", value: 10 },
];

const pieColors = [
  "hsl(var(--cyber-purple))",
  "hsl(var(--cyber-blue))",
  "hsl(var(--cyber-teal))",
  "hsl(var(--cyber-yellow))",
  "hsl(var(--cyber-green))",
];

const serviceCards = [
  { title: "Video Detection", description: "Analyze videos for AI-generated deepfakes", icon: Video, path: "/video-detection", tone: "video" },
  { title: "Image Detection", description: "Detect AI artifacts and manipulated images", icon: Image, path: "/image-detection", tone: "image" },
  { title: "Audio Detection", description: "Identify synthetic voice and audio anomalies", icon: Mic, path: "/audio-detection", tone: "audio" },
  { title: "Email Analysis", description: "Scan emails for phishing and malicious links", icon: Mail, path: "/email-analysis", tone: "email" },
  { title: "Link Scanner", description: "Check URLs against malware databases", icon: LinkIcon, path: "/link-scanner", tone: "link" },
  { title: "Breach Check", description: "Monitor accounts for exposed credentials", icon: ShieldAlert, path: "/breach-check", tone: "breach" },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const Dashboard: React.FC = () => {
  const [isNewUser, setIsNewUser] = useState(() => {
    return localStorage.getItem("cybershield_welcomed") !== "true";
  });
  const [newAccount, setNewAccount] = useState("");

  const dismissWelcome = () => {
    setIsNewUser(false);
    localStorage.setItem("cybershield_welcomed", "true");
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome banner for new users */}
      <AnimatePresence>
        {isNewUser && (
          <motion.div
            variants={item}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:bg-primary/10">
              <button
                onClick={dismissWelcome}
                className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">Welcome to CyberShield!</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Get started by adding accounts you'd like to monitor for breaches, phishing, and deepfakes. We'll keep an eye on them 24/7.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score hero */}
      <motion.div variants={item}>
        <div className="glass-hero-purple dashboard-score-hero overflow-hidden rounded-[1.75rem] text-white">
          {/* Desktop: 3-col, Tablet: stacked, Mobile: stacked */}
          <div className="flex flex-col xl:grid xl:grid-cols-[220px_1fr_280px]">
            {/* Grade orb */}
            <div className="flex flex-col items-center justify-center gap-3 p-6 sm:p-8">
              <div className="dashboard-grade-orb flex h-28 w-28 items-center justify-center rounded-full ring-4 ring-white/25 sm:h-36 sm:w-36">
                <span className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{overallGrade}</span>
              </div>
              <div className="text-center">
                <p className="font-display text-sm font-semibold text-white/90">Security Score</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-2.5 w-24 overflow-hidden rounded-full bg-white/25 sm:w-28">
                    <div className="h-full rounded-full bg-white/85 transition-all duration-700" style={{ width: `${overallScore}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-white/85">{overallScore}%</span>
                </div>
              </div>
            </div>

            {/* Middle: Accounts + Alerts */}
            <div className="grid gap-3 border-t border-white/15 p-4 sm:grid-cols-2 sm:p-5 xl:border-l xl:border-t-0">
              <div className="glass-inset-panel p-4 sm:p-5">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/50">Monitored Accounts</h3>
                <div className="space-y-2">
                  {monitoredAccounts.map((account) => (
                    <div key={account.name} className="flex items-center justify-between rounded-xl bg-muted/55 px-3 py-2.5 sm:px-4 sm:py-3">
                      <span className="min-w-0 truncate text-sm font-semibold text-foreground sm:text-[15px]">{account.name}</span>
                      <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-xs font-bold text-primary sm:h-8 sm:w-8 sm:text-sm">{account.grade}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-inset-panel p-4 sm:p-5">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/50">Recent Alerts</h3>
                <div className="space-y-2">
                  {recentNotifications.map((n) => (
                    <div key={n.id} className="flex items-start gap-2.5 rounded-xl bg-muted/55 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
                      {n.type === "danger" ? (
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                      ) : n.type === "warning" ? (
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-score-warning" />
                      ) : (
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-score-safe" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-snug text-foreground sm:text-[15px]">{n.message}</p>
                        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Pink panel — breach sources OR add accounts for new users */}
            <div className="border-t border-white/15 p-4 sm:p-5 xl:border-l xl:border-t-0">
              {isNewUser ? (
                <div className="glass-accent-pink h-full rounded-2xl p-5">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-foreground/60">Add Accounts</h3>
                  <p className="mb-4 text-sm leading-relaxed text-foreground/50">
                    Enter emails or social handles to start monitoring.
                  </p>
                  <div className="space-y-2.5">
                    <Input
                      value={newAccount}
                      onChange={(e) => setNewAccount(e.target.value)}
                      placeholder="email or @handle"
                      className="h-9 rounded-xl border-white/20 bg-white/60 text-sm text-foreground placeholder:text-muted-foreground/60 dark:bg-white/10"
                    />
                    <Button size="sm" className="w-full gap-1.5 rounded-xl">
                      <Plus className="h-3.5 w-3.5" /> Add Account
                    </Button>
                  </div>
                  <button onClick={dismissWelcome} className="mt-3 block w-full text-center text-xs text-foreground/40 hover:text-foreground/60">
                    Skip for now
                  </button>
                </div>
              ) : (
                <div className="glass-accent-pink dashboard-breach-panel h-full p-5">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/60">Breach Sources</h3>
                  <div className="mx-auto h-32 w-32 sm:h-36 sm:w-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={breachSourceData} cx="50%" cy="50%" innerRadius={28} outerRadius={54} dataKey="value" strokeWidth={2} stroke="hsl(var(--card) / 0.4)">
                          {breachSourceData.map((_, i) => (
                            <Cell key={i} fill={pieColors[i]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {breachSourceData.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                        <span className="text-xs text-foreground/75 sm:text-sm">{d.name}</span>
                        <span className="ml-auto text-xs font-semibold text-foreground/55 sm:text-sm">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services heading */}
      <motion.div variants={item}>
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Security Services</h2>
      </motion.div>

      {/* Service cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {serviceCards.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.title} variants={item}>
              <Link to={service.path} className="block">
                <div className={`dashboard-service-card dashboard-service-card--${service.tone} group p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5`}>
                  <div className={`dashboard-service-accent dashboard-service-accent--${service.tone}`} />
                  <div className={`dashboard-service-icon dashboard-service-icon--${service.tone}`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="mt-4 sm:mt-5">
                    <h3 className="font-display text-sm font-bold text-foreground sm:text-base">{service.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:mt-1.5 sm:text-sm">{service.description}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 sm:mt-4 sm:text-sm">
                    Open <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Dashboard;
