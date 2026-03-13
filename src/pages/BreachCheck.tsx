import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Plus, Trash2, AlertTriangle, ShieldCheck, Lock, Eye, Mail, Phone, Globe, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RiskGauge from "@/components/RiskGauge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const mockAccounts = [
  {
    email: "john.doe@gmail.com",
    score: 35,
    breaches: 4,
    exposedData: ["Email", "Password", "Phone", "IP Address"],
    recentBreaches: [
      { source: "SocialApp.io", date: "2025-11-14", records: "2.3M" },
      { source: "ShopEasy.com", date: "2025-08-02", records: "890K" },
    ],
  },
  {
    email: "johndoe@outlook.com",
    score: 82,
    breaches: 1,
    exposedData: ["Email"],
    recentBreaches: [
      { source: "OldForum.net", date: "2024-03-19", records: "120K" },
    ],
  },
];

const exposureData = [
  { name: "Email", value: 6, icon: Mail },
  { name: "Password", value: 4, icon: Lock },
  { name: "Phone", value: 2, icon: Phone },
  { name: "IP Address", value: 3, icon: Globe },
  { name: "Username", value: 5, icon: Eye },
];

const pieColors = [
  "hsl(var(--cyber-purple))",
  "hsl(var(--cyber-red))",
  "hsl(var(--cyber-blue))",
  "hsl(var(--cyber-yellow))",
  "hsl(var(--cyber-teal))",
];

const barData = [
  { name: "2022", count: 1 },
  { name: "2023", count: 2 },
  { name: "2024", count: 1 },
  { name: "2025", count: 3 },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const BreachCheck: React.FC = () => {
  const [newEmail, setNewEmail] = useState("");
  const totalBreaches = mockAccounts.reduce((sum, a) => sum + a.breaches, 0);
  const avgScore = Math.round(mockAccounts.reduce((sum, a) => sum + a.score, 0) / mockAccounts.length);
  const ratingLabel = avgScore >= 80 ? "Low Risk" : avgScore >= 50 ? "Moderate Risk" : "High Risk";

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Purple Hero Banner */}
      <motion.div variants={item}>
        <div className="glass-hero-purple overflow-hidden rounded-2xl p-6 text-white">
          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold">Breach Check</h1>
                  <p className="text-sm text-white/70">Monitor your accounts for data breaches</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs text-white/60">Data Exposure</p>
                  <p className="font-display text-2xl font-bold">{ratingLabel}</p>
                </div>
                <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs text-white/60">Total Breaches</p>
                  <p className="font-display text-2xl font-bold">{totalBreaches}</p>
                </div>
                <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs text-white/60">Avg. Score</p>
                  <p className="font-display text-2xl font-bold">{avgScore}%</p>
                </div>
              </div>
            </div>

            {/* Gauge */}
            <div className="flex items-center justify-center">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <RiskGauge score={avgScore} size={130} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Add account */}
      <motion.div variants={item}>
        <div className="glass-card flex gap-3 p-4">
          <Input
            placeholder="Add email or account to monitor..."
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border-white/10 bg-transparent"
          />
          <Button className="shrink-0">
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </motion.div>

      {/* Exposure overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div variants={item}>
          <div className="glass-card p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Data Exposure Breakdown</h3>
            <div className="flex items-center gap-4">
              <div className="h-40 w-40 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={exposureData} cx="50%" cy="50%" innerRadius={35} outerRadius={62} dataKey="value" strokeWidth={2} stroke="hsl(var(--card) / 0.5)">
                      {exposureData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {exposureData.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                      <Icon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-foreground">{d.name}</span>
                      <span className="text-xs text-muted-foreground">({d.value})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="glass-card p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Breach Sources Over Time</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Bar dataKey="count" fill="hsl(var(--cyber-purple))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Account cards */}
      <div className="space-y-4">
        {mockAccounts.map((account) => (
          <motion.div key={account.email} variants={item}>
            <div className="glass-card p-5">
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <div className="flex-shrink-0">
                  <RiskGauge score={account.score} size={130} />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-semibold text-foreground">{account.email}</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-score-danger">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {account.exposedData.map((d) => (
                      <span key={d} className="rounded-full bg-score-danger/10 px-2.5 py-1 text-[11px] font-medium text-score-danger backdrop-blur-sm">{d}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Found in <span className="font-bold text-foreground">{account.breaches}</span> breach{account.breaches !== 1 && "es"}</p>
                  <div className="space-y-1.5">
                    {account.recentBreaches.map((b) => (
                      <div key={b.source} className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-score-warning" />
                          <span className="text-sm text-foreground">{b.source}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">{b.date}</span>
                          <span className="ml-3 text-xs text-muted-foreground">{b.records} records</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BreachCheck;
