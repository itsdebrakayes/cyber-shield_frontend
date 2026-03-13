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
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
  { title: "Video Detection", description: "Analyze videos for AI-generated deepfakes", icon: Video, path: "/video-detection", colorVar: "--cyber-purple" },
  { title: "Image Detection", description: "Detect AI artifacts and manipulated images", icon: Image, path: "/image-detection", colorVar: "--cyber-blue" },
  { title: "Audio Detection", description: "Identify synthetic voice and audio anomalies", icon: Mic, path: "/audio-detection", colorVar: "--cyber-teal" },
  { title: "Email Analysis", description: "Scan emails for phishing and malicious links", icon: Mail, path: "/email-analysis", colorVar: "--cyber-yellow" },
  { title: "Link Scanner", description: "Check URLs against malware databases", icon: LinkIcon, path: "/link-scanner", colorVar: "--cyber-green" },
  { title: "Breach Check", description: "Monitor accounts for exposed credentials", icon: ShieldAlert, path: "/breach-check", colorVar: "--cyber-red" },
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
      {/* Security Score Banner — reference-style */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-0" style={{ background: "var(--gradient-banner)" }}>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[280px_1fr]">
              {/* Left: Big grade */}
              <div className="flex flex-col items-center justify-center gap-3 p-8">
                <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-card/70 shadow-xl backdrop-blur-sm">
                  <span className="font-display text-5xl font-extrabold text-score-safe">{overallGrade}</span>
                </div>
                <div className="text-center">
                  <p className="font-display text-sm font-semibold text-foreground">Security Score</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Progress value={overallScore} className="h-2 w-24" />
                    <span className="text-xs font-medium text-muted-foreground">{overallScore}%</span>
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div className="grid gap-4 border-t border-border/30 p-6 md:grid-cols-2 md:border-l md:border-t-0">
                {/* Monitored Accounts */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Monitored Accounts</h3>
                  <div className="space-y-1.5">
                    {monitoredAccounts.map((account) => (
                      <div key={account.name} className="flex items-center justify-between rounded-lg bg-card/50 px-3 py-2 backdrop-blur-sm">
                        <span className="truncate text-xs text-foreground">{account.name}</span>
                        <span
                          className={`ml-2 text-xs font-bold ${
                            account.score >= 80 ? "text-score-safe" : account.score >= 60 ? "text-score-warning" : "text-score-danger"
                          }`}
                        >
                          {account.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts + Chart */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Alerts</h3>
                  <div className="space-y-1.5">
                    {recentNotifications.map((n) => (
                      <div key={n.id} className="flex items-start gap-2 rounded-lg bg-card/50 px-3 py-2 backdrop-blur-sm">
                        {n.type === "danger" ? (
                          <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0 text-score-danger" />
                        ) : n.type === "warning" ? (
                          <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0 text-score-warning" />
                        ) : (
                          <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-score-safe" />
                        )}
                        <p className="line-clamp-2 text-[11px] leading-tight text-foreground">{n.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mini pie */}
                  <div className="flex items-center gap-3 rounded-lg bg-card/50 p-3 backdrop-blur-sm">
                    <div className="h-16 w-16 flex-shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={breachSourceData} cx="50%" cy="50%" innerRadius={18} outerRadius={30} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                            {breachSourceData.map((_, i) => (
                              <Cell key={i} fill={pieColors[i]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                      {breachSourceData.map((d, i) => (
                        <div key={d.name} className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                          <span className="text-[10px] text-muted-foreground">{d.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Service Cards */}
      <motion.div variants={item}>
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Security Services</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {serviceCards.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.title} variants={item}>
              <Link to={service.path} className="block">
                <Card className="group h-full cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="flex flex-col items-start gap-3 p-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `hsl(var(${service.colorVar}) / 0.15)`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: `hsl(var(${service.colorVar}))` }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-foreground">{service.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Open <ArrowRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Dashboard;
