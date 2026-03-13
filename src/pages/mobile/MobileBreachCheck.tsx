import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Plus, Trash2, AlertTriangle, Lock, Eye, Mail, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RiskGauge from "@/components/RiskGauge";

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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const MobileBreachCheck: React.FC = () => {
  const [newEmail, setNewEmail] = useState("");
  const totalBreaches = mockAccounts.reduce((sum, a) => sum + a.breaches, 0);
  const avgScore = Math.round(mockAccounts.reduce((sum, a) => sum + a.score, 0) / mockAccounts.length);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 pb-24">
      <motion.div variants={item}>
        <div className="mobile-score-card overflow-hidden rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <ShieldAlert className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white">Breach Check</h1>
              <p className="text-xs text-white/60">Monitor your accounts</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
              <p className="text-lg font-bold text-white">{mockAccounts.length}</p>
              <p className="text-[10px] text-white/50">Accounts</p>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
              <p className="text-lg font-bold text-white">{totalBreaches}</p>
              <p className="text-[10px] text-white/50">Breaches</p>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
              <p className="text-lg font-bold text-white">{avgScore}%</p>
              <p className="text-[10px] text-white/50">Avg Score</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="glass-card flex gap-2 rounded-2xl p-3">
          <Input placeholder="Add email to monitor…" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="border-transparent bg-transparent text-sm" />
          <Button size="sm" className="shrink-0"><Plus className="mr-1 h-3.5 w-3.5" /> Add</Button>
        </div>
      </motion.div>

      {mockAccounts.map((account) => (
        <motion.div key={account.email} variants={item}>
          <div className="glass-card overflow-hidden rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-bold text-foreground truncate">{account.email}</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <RiskGauge score={account.score} size={80} />
              <div className="flex-1">
                <div className="flex flex-wrap gap-1.5">
                  {account.exposedData.map((d) => (
                    <span key={d} className="rounded-full bg-destructive/10 px-2 py-1 text-[10px] font-semibold text-destructive">{d}</span>
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Found in <span className="font-bold text-foreground">{account.breaches}</span> breach{account.breaches !== 1 && "es"}
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              {account.recentBreaches.map((b) => (
                <div key={b.source} className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-score-warning" />
                    <span className="text-xs font-medium text-foreground">{b.source}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{b.date}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MobileBreachCheck;
