import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, Plus, Trash2, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RiskGauge from "@/components/RiskGauge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

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
  { name: "Email", value: 6 },
  { name: "Password", value: 4 },
  { name: "Phone", value: 2 },
  { name: "IP Address", value: 3 },
  { name: "Username", value: 5 },
];

const pieColors = [
  "hsl(var(--cyber-purple))",
  "hsl(var(--cyber-red))",
  "hsl(var(--cyber-blue))",
  "hsl(var(--cyber-yellow))",
  "hsl(var(--cyber-teal))",
];

const BreachCheck: React.FC = () => {
  const [newEmail, setNewEmail] = useState("");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Breach Check</h1>
        <p className="text-sm text-muted-foreground">Monitor your accounts for data breaches and exposed credentials</p>
      </div>

      {/* Add account */}
      <Card>
        <CardContent className="flex gap-3 p-4">
          <Input placeholder="Add email or account to monitor" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <Button><Plus className="mr-2 h-4 w-4" /> Add</Button>
        </CardContent>
      </Card>

      {/* Exposure overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Data Exposure Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={exposureData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                    {exposureData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {exposureData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                  <span className="text-xs text-foreground">{d.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Breach Sources Over Time</CardTitle></CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: "2022", count: 1 }, { name: "2023", count: 2 }, { name: "2024", count: 1 }, { name: "2025", count: 3 }]}>
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Bar dataKey="count" fill="hsl(var(--cyber-purple))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account cards */}
      <div className="space-y-4">
        {mockAccounts.map((account) => (
          <Card key={account.email}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <RiskGauge score={account.score} size={140} />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-semibold text-foreground">{account.email}</h3>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-score-danger"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {account.exposedData.map((d) => (
                      <span key={d} className="rounded-full bg-score-danger/10 px-2.5 py-0.5 text-xs font-medium text-score-danger">{d}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Found in <span className="font-bold text-foreground">{account.breaches}</span> data breach{account.breaches !== 1 && "es"}</p>
                  <div className="space-y-1.5">
                    {account.recentBreaches.map((b) => (
                      <div key={b.source} className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default BreachCheck;
