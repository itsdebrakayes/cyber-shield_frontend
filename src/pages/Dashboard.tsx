import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Video,
  Image,
  Mic,
  Mail,
  Link as LinkIcon,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

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
  { title: "Video Detection", description: "Analyze videos for AI-generated deepfakes", icon: Video, path: "/video-detection", gradient: "from-violet-100 to-purple-50 dark:from-violet-500/10 dark:to-purple-500/5", iconBg: "bg-violet-200 dark:bg-violet-500/20", iconColor: "text-violet-600 dark:text-violet-400" },
  { title: "Image Detection", description: "Detect AI artifacts and manipulated images", icon: Image, path: "/image-detection", gradient: "from-sky-100 to-blue-50 dark:from-sky-500/10 dark:to-blue-500/5", iconBg: "bg-sky-200 dark:bg-sky-500/20", iconColor: "text-sky-600 dark:text-sky-400" },
  { title: "Audio Detection", description: "Identify synthetic voice and audio anomalies", icon: Mic, path: "/audio-detection", gradient: "from-emerald-100 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/5", iconBg: "bg-emerald-200 dark:bg-emerald-500/20", iconColor: "text-emerald-600 dark:text-emerald-400" },
  { title: "Email Analysis", description: "Scan emails for phishing and malicious links", icon: Mail, path: "/email-analysis", gradient: "from-amber-100 to-yellow-50 dark:from-amber-500/10 dark:to-yellow-500/5", iconBg: "bg-amber-200 dark:bg-amber-500/20", iconColor: "text-amber-600 dark:text-amber-400" },
  { title: "Link Scanner", description: "Check URLs against malware databases", icon: LinkIcon, path: "/link-scanner", gradient: "from-lime-100 to-green-50 dark:from-lime-500/10 dark:to-green-500/5", iconBg: "bg-lime-200 dark:bg-lime-500/20", iconColor: "text-lime-600 dark:text-lime-400" },
  { title: "Breach Check", description: "Monitor accounts for exposed credentials", icon: ShieldAlert, path: "/breach-check", gradient: "from-rose-100 to-pink-50 dark:from-rose-500/10 dark:to-pink-500/5", iconBg: "bg-rose-200 dark:bg-rose-500/20", iconColor: "text-rose-600 dark:text-rose-400" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const Dashboard: React.FC = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Security Score Banner */}
      <motion.div variants={item}>
        <div className="glass-hero-purple overflow-hidden rounded-2xl text-white">
          <div className="grid md:grid-cols-[220px_1fr_260px]">
            {/* Left: Big grade circle */}
            <div className="flex flex-col items-center justify-center gap-3 p-8">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-2xl shadow-emerald-500/30 ring-4 ring-white/20">
                <span className="font-display text-5xl font-extrabold tracking-tight">{overallGrade}</span>
              </div>
              <div className="text-center">
                <p className="font-display text-sm font-semibold text-white/90">Security Score</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-2.5 w-28 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full rounded-full bg-white/80 transition-all duration-700" style={{ width: `${overallScore}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-white/80">{overallScore}%</span>
                </div>
              </div>
            </div>

            {/* Middle: Inset panels */}
            <div className="grid gap-3 border-t border-white/10 p-5 md:grid-cols-2 md:border-l md:border-t-0">
              {/* Monitored Accounts */}
              <div className="glass-inset-panel p-4">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/50">Monitored Accounts</h3>
                <div className="space-y-2">
                  {monitoredAccounts.map((account) => (
                    <div key={account.name} className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-2.5">
                      <span className="truncate text-sm font-medium text-foreground">{account.name}</span>
                      <span className="ml-3 flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">{account.grade}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="glass-inset-panel p-4">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/50">Recent Alerts</h3>
                <div className="space-y-2">
                  {recentNotifications.map((n) => (
                    <div key={n.id} className="flex items-start gap-3 rounded-xl bg-muted/50 px-4 py-2.5">
                      {n.type === "danger" ? (
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                      ) : n.type === "warning" ? (
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-score-warning" />
                      ) : (
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-score-safe" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-snug text-foreground">{n.message}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Pink accent panel */}
            <div className="border-t border-white/10 p-5 md:border-l md:border-t-0">
              <div className="glass-accent-pink h-full p-4">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/60">Breach Sources</h3>
                <div className="mx-auto h-32 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={breachSourceData} cx="50%" cy="50%" innerRadius={28} outerRadius={55} dataKey="value" strokeWidth={2} stroke="hsl(0 0% 100% / 0.3)">
                        {breachSourceData.map((_, i) => (
                          <Cell key={i} fill={pieColors[i]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 space-y-1">
                  {breachSourceData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                      <span className="text-xs text-foreground/70">{d.name}</span>
                      <span className="ml-auto text-xs font-semibold text-foreground/50">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Service Cards */}
      <motion.div variants={item}>
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Security Services</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {serviceCards.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.title} variants={item}>
              <Link to={service.path} className="block">
                <div className={`glass-card group aspect-square cursor-pointer bg-gradient-to-br ${service.gradient} p-5 transition-all hover:shadow-xl hover:-translate-y-1`}>
                  <div className="flex h-full flex-col">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.iconBg}`}>
                      <Icon className={`h-6 w-6 ${service.iconColor}`} />
                    </div>
                    <div className="mt-auto">
                      <h3 className="font-display text-sm font-bold text-foreground">{service.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Open <ArrowRight className="h-3 w-3" />
                    </div>
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
