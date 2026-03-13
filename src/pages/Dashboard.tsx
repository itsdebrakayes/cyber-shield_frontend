import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <div className="glass-hero-purple dashboard-score-hero overflow-hidden rounded-[1.75rem] text-white">
          <div className="grid md:grid-cols-[240px_1fr_280px]">
            <div className="flex flex-col items-center justify-center gap-3 p-8">
              <div className="dashboard-grade-orb flex h-36 w-36 items-center justify-center rounded-full ring-4 ring-white/25">
                <span className="font-display text-5xl font-extrabold tracking-tight text-white">{overallGrade}</span>
              </div>
              <div className="text-center">
                <p className="font-display text-sm font-semibold text-white/90">Security Score</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-2.5 w-28 overflow-hidden rounded-full bg-white/25">
                    <div className="h-full rounded-full bg-white/85 transition-all duration-700" style={{ width: `${overallScore}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-white/85">{overallScore}%</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 border-t border-white/15 p-5 md:grid-cols-2 md:border-l md:border-t-0">
              <div className="glass-inset-panel p-5">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/50">Monitored Accounts</h3>
                <div className="space-y-2.5">
                  {monitoredAccounts.map((account) => (
                    <div key={account.name} className="flex items-center justify-between rounded-xl bg-muted/55 px-4 py-3">
                      <span className="truncate text-[15px] font-semibold text-foreground">{account.name}</span>
                      <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 text-sm font-bold text-primary">{account.grade}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-inset-panel p-5">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/50">Recent Alerts</h3>
                <div className="space-y-2.5">
                  {recentNotifications.map((n) => (
                    <div key={n.id} className="flex items-start gap-3 rounded-xl bg-muted/55 px-4 py-3">
                      {n.type === "danger" ? (
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                      ) : n.type === "warning" ? (
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-score-warning" />
                      ) : (
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-score-safe" />
                      )}
                      <div className="flex-1">
                        <p className="text-[15px] leading-snug text-foreground">{n.message}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/15 p-5 md:border-l md:border-t-0">
              <div className="glass-accent-pink dashboard-breach-panel h-full p-5">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/60">Breach Sources</h3>
                <div className="mx-auto h-36 w-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={breachSourceData} cx="50%" cy="50%" innerRadius={30} outerRadius={58} dataKey="value" strokeWidth={2} stroke="hsl(var(--card) / 0.4)">
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
                      <span className="text-sm text-foreground/75">{d.name}</span>
                      <span className="ml-auto text-sm font-semibold text-foreground/55">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Security Services</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {serviceCards.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.title} variants={item}>
              <Link to={service.path} className="block">
                <div className={`dashboard-service-card dashboard-service-card--${service.tone} group p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}>
                  <div className={`dashboard-service-accent dashboard-service-accent--${service.tone}`} />
                  <div className={`dashboard-service-icon dashboard-service-icon--${service.tone}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5">
                    <h3 className="font-display text-base font-bold text-foreground">{service.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Open <ArrowRight className="h-4 w-4" />
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
