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
  Database,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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
  { id: 1, type: "danger", message: "Your Gmail password appeared in a recent data breach. Change it immediately.", time: "2 hours ago" },
  { id: 2, type: "warning", message: "Suspicious login attempt detected on your Instagram account from an unrecognized device.", time: "5 hours ago" },
  { id: 3, type: "info", message: "Monthly security report is ready. Your overall score improved by 4 points.", time: "1 day ago" },
];

const breachSourceData = [
  { name: "Social Media", value: 35 },
  { name: "Email Services", value: 25 },
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
  { title: "Deepfake Video Detection", description: "Analyze videos for AI-generated facial movements and lip sync anomalies", icon: Video, path: "/video-detection", color: "cyber-purple" },
  { title: "Deepfake Image Detection", description: "Detect AI-generated artifacts, extra fingers, and inconsistent lighting in images", icon: Image, path: "/image-detection", color: "cyber-blue" },
  { title: "Deepfake Audio Detection", description: "Identify synthetic voice patterns and unnatural audio characteristics", icon: Mic, path: "/audio-detection", color: "cyber-teal" },
  { title: "Email / Phishing Analysis", description: "Scan emails for phishing attempts, malicious links, and suspicious patterns", icon: Mail, path: "/email-analysis", color: "cyber-yellow" },
  { title: "Link Scanner", description: "Check URLs against malware databases and phishing registries", icon: LinkIcon, path: "/link-scanner", color: "cyber-green" },
  { title: "Breach Check", description: "Monitor your accounts for data breaches and exposed credentials", icon: Database, path: "/breach-check", color: "cyber-red" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Dashboard: React.FC = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Security Score Banner */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-0" style={{ background: "var(--gradient-banner)" }}>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Overall Grade */}
              <div className="flex items-center gap-6">
                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-card/80 backdrop-blur-sm shadow-lg">
                  <span className="font-display text-4xl font-bold text-score-safe">{overallGrade}</span>
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground">Security Score</h2>
                  <p className="text-sm text-muted-foreground">Based on {monitoredAccounts.length} monitored accounts</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={overallScore} className="h-2 w-32" />
                    <span className="text-xs font-medium text-muted-foreground">{overallScore}%</span>
                  </div>
                </div>
              </div>

              {/* Monitored Accounts */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Monitored Accounts</h3>
                <div className="space-y-1.5">
                  {monitoredAccounts.map((account) => (
                    <div key={account.name} className="flex items-center justify-between rounded-lg bg-card/60 px-3 py-1.5 backdrop-blur-sm">
                      <span className="truncate text-xs text-foreground">{account.name}</span>
                      <span
                        className={`text-xs font-bold ${
                          account.score >= 80 ? "text-score-safe" : account.score >= 60 ? "text-score-warning" : "text-score-danger"
                        }`}
                      >
                        {account.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Recent Alerts</h3>
                <div className="space-y-1.5">
                  {recentNotifications.map((n) => (
                    <div key={n.id} className="flex items-start gap-2 rounded-lg bg-card/60 px-3 py-2 backdrop-blur-sm">
                      {n.type === "danger" ? (
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-score-danger" />
                      ) : n.type === "warning" ? (
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-score-warning" />
                      ) : (
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-score-safe" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-xs text-foreground">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Breach source chart */}
            <div className="mt-4 flex items-center gap-6 rounded-xl bg-card/60 p-4 backdrop-blur-sm">
              <div className="h-28 w-28 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={breachSourceData} cx="50%" cy="50%" innerRadius={28} outerRadius={48} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                      {breachSourceData.map((_, i) => (
                        <Cell key={i} fill={pieColors[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {breachSourceData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                    <span className="text-xs text-foreground">{d.name}</span>
                    <span className="text-xs text-muted-foreground">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Service Cards */}
      <motion.div variants={item}>
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Security Services</h2>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCards.map((service) => (
          <motion.div key={service.title} variants={item}>
            <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader className="pb-3">
                <div className={`mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-${service.color}/15`}>
                  <service.icon className={`h-5 w-5 text-${service.color}`} />
                </div>
                <CardTitle className="font-display text-base">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-between gap-4">
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <Button asChild size="sm" className="w-full">
                  <Link to={service.path}>
                    Open <TrendingUp className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
