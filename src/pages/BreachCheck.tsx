import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Search, Plus, Trash2, AlertTriangle, Lock, Eye, Mail, Phone, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RiskGauge from "@/components/RiskGauge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileBreachCheck from "@/pages/mobile/MobileBreachCheck";

const mockLookupResults = [
  {
    score: 28, breaches: 6,
    exposedData: ["Email", "Password", "Phone", "IP Address", "Username"],
    recentBreaches: [
      { source: "SocialApp.io", date: "2025-11-14", records: "2.3M" },
      { source: "ShopEasy.com", date: "2025-08-02", records: "890K" },
      { source: "GameVault.gg", date: "2025-03-11", records: "1.5M" },
    ],
  },
  {
    score: 72, breaches: 2,
    exposedData: ["Email", "Username"],
    recentBreaches: [
      { source: "OldForum.net", date: "2024-03-19", records: "120K" },
      { source: "LeakedDB.com", date: "2023-07-05", records: "450K" },
    ],
  },
  {
    score: 91, breaches: 1,
    exposedData: ["Email"],
    recentBreaches: [
      { source: "MinorSite.org", date: "2022-12-01", records: "30K" },
    ],
  },
];

const mockAccounts = [
  {
    email: "john.doe@gmail.com", score: 35, breaches: 4,
    exposedData: ["Email", "Password", "Phone", "IP Address"],
    recentBreaches: [
      { source: "SocialApp.io", date: "2025-11-14", records: "2.3M" },
      { source: "ShopEasy.com", date: "2025-08-02", records: "890K" },
    ],
  },
  {
    email: "johndoe@outlook.com", score: 82, breaches: 1,
    exposedData: ["Email"],
    recentBreaches: [{ source: "OldForum.net", date: "2024-03-19", records: "120K" }],
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
  "hsl(var(--cyber-purple))", "hsl(var(--cyber-red))", "hsl(var(--cyber-blue))",
  "hsl(var(--cyber-yellow))", "hsl(var(--cyber-teal))",
];

const barData = [
  { name: "2022", count: 1 }, { name: "2023", count: 2 },
  { name: "2024", count: 1 }, { name: "2025", count: 3 },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

interface LookupResult {
  score: number;
  breaches: number;
  exposedData: string[];
  recentBreaches: { source: string; date: string; records: string }[];
}

const BreachCheck: React.FC = () => {
  const isMobile = useIsMobile();
  const [lookupEmail, setLookupEmail] = useState("");
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const totalBreaches = mockAccounts.reduce((sum, a) => sum + a.breaches, 0);
  const avgScore = Math.round(mockAccounts.reduce((sum, a) => sum + a.score, 0) / mockAccounts.length);

  const handleLookup = () => {
    if (!lookupEmail.trim()) return;
    setIsChecking(true);
    setLookupResult(null);
    setTimeout(() => {
      const result = mockLookupResults[Math.floor(Math.random() * mockLookupResults.length)];
      setLookupResult(result);
      setIsChecking(false);
    }, 1800);
  };

  if (isMobile) return <MobileBreachCheck />;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Section 1: Public Breach Lookup */}
      <motion.div variants={item}>
        <div className="glass-hero-purple overflow-hidden rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Search className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Breach Lookup</h1>
              <p className="text-sm text-white/70">Check any email for known data breaches</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="Enter any email address to check…"
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLookup()}
              className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/30"
            />
            <Button onClick={handleLookup} disabled={isChecking || !lookupEmail.trim()} className="shrink-0 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
              {isChecking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              {isChecking ? "Scanning…" : "Check"}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Lookup Results */}
      {(isChecking || lookupResult) && (
        <motion.div variants={item} initial="hidden" animate="show">
          <div className="glass-card overflow-hidden rounded-2xl p-6">
            {isChecking ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Scanning breach databases for <span className="font-semibold text-foreground">{lookupEmail}</span>…</p>
              </div>
            ) : lookupResult && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-foreground">Results for {lookupEmail}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${lookupResult.score >= 70 ? "bg-score-safe/10 text-score-safe" : lookupResult.score >= 40 ? "bg-score-warning/10 text-score-warning" : "bg-score-danger/10 text-score-danger"}`}>
                    {lookupResult.score >= 70 ? "Low Risk" : lookupResult.score >= 40 ? "Moderate Risk" : "High Risk"}
                  </span>
                </div>
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                  <div className="flex-shrink-0">
                    <RiskGauge score={lookupResult.score} size={150} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {lookupResult.exposedData.map((d) => (
                        <span key={d} className="rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive">{d}</span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Found in <span className="font-bold text-foreground">{lookupResult.breaches}</span> breach{lookupResult.breaches !== 1 && "es"}
                    </p>
                    <div className="space-y-2">
                      {lookupResult.recentBreaches.map((b) => (
                        <div key={b.source} className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3 backdrop-blur-sm">
                          <div className="flex items-center gap-2.5">
                            <AlertTriangle className="h-4 w-4 text-score-warning" />
                            <span className="text-sm font-medium text-foreground">{b.source}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-muted-foreground">{b.date}</span>
                            <span className="ml-4 text-xs font-medium text-muted-foreground">{b.records} records</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Section 2: Personal Monitoring */}
      <motion.div variants={item}>
        <div className="flex items-center gap-3 mb-2">
          <ShieldAlert className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-display text-lg font-bold text-foreground">Your Monitored Accounts</h2>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <span>{mockAccounts.length} accounts</span>
            <span>·</span>
            <span>{totalBreaches} breaches</span>
            <span>·</span>
            <span>Avg {avgScore}%</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="glass-card flex gap-3 p-4">
          <Input placeholder="Add email to ongoing monitoring…" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="border-white/10 bg-transparent" />
          <Button className="shrink-0"><Plus className="mr-2 h-4 w-4" /> Monitor</Button>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div variants={item}>
          <div className="glass-card p-5">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Data Exposure Breakdown</h3>
            <div className="flex items-center gap-6">
              <div className="h-44 w-44 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={exposureData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" strokeWidth={3} stroke="hsl(var(--card) / 0.5)">
                    {exposureData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                  </Pie></PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2.5">
                {exposureData.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.name} className="flex items-center gap-2.5">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{d.name}</span>
                      <span className="ml-auto text-sm font-semibold text-muted-foreground">{d.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="glass-card p-5">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Breach Sources Over Time</h3>
            <div className="h-52">
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

      <div className="space-y-4">
        {mockAccounts.map((account) => (
          <motion.div key={account.email} variants={item}>
            <div className="glass-card p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <div className="flex-shrink-0"><RiskGauge score={account.score} size={150} /></div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-foreground">{account.email}</h3>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {account.exposedData.map((d) => (
                      <span key={d} className="rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive">{d}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Found in <span className="font-bold text-foreground">{account.breaches}</span> breach{account.breaches !== 1 && "es"}</p>
                  <div className="space-y-2">
                    {account.recentBreaches.map((b) => (
                      <div key={b.source} className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3 backdrop-blur-sm">
                        <div className="flex items-center gap-2.5"><AlertTriangle className="h-4 w-4 text-score-warning" /><span className="text-sm font-medium text-foreground">{b.source}</span></div>
                        <div className="text-right"><span className="text-xs text-muted-foreground">{b.date}</span><span className="ml-4 text-xs font-medium text-muted-foreground">{b.records} records</span></div>
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
