import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertTriangle, CheckCircle, XCircle, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import RiskGauge from "@/components/RiskGauge";

const mockResult = {
  score: 22,
  verdict: "High Phishing Risk",
  extractedUrls: [
    { url: "http://secure-login.fakebank.xyz/verify", score: 8, verdict: "Dangerous" },
    { url: "https://tracking.newsletter.com/open", score: 85, verdict: "Safe" },
    { url: "http://bit.ly/3xFakeLink", score: 25, verdict: "Suspicious" },
  ],
  patterns: [
    "Sender domain does not match claimed organization",
    "Urgency language detected",
    "Mismatched reply-to address",
    "Suspicious shortened URL detected",
  ],
};

const MobileEmailAnalysis: React.FC = () => {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<typeof mockResult | null>(null);

  const handleScan = () => {
    if (!body) return;
    setScanning(true);
    setTimeout(() => { setScanning(false); setResult(mockResult); }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-24">
      <div>
        <h1 className="font-display text-xl font-bold text-foreground">Email Analysis</h1>
        <p className="text-xs text-muted-foreground">Scan emails for phishing threats</p>
      </div>

      <div className="glass-card overflow-hidden rounded-2xl p-4">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Sender</Label>
            <Input placeholder="sender@example.com" value={sender} onChange={(e) => setSender(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Subject</Label>
            <Input placeholder="Subject line" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Body</Label>
            <Textarea placeholder="Paste email body…" rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          <Button onClick={handleScan} disabled={scanning || !body} className="w-full">
            {scanning ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" /> : <><Send className="mr-2 h-4 w-4" /> Analyze</>}
          </Button>
        </div>
      </div>

      {scanning && (
        <div className="glass-card flex flex-col items-center rounded-2xl py-12">
          <div className="mb-3 h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-display text-base font-semibold text-foreground">Analyzing…</p>
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="glass-card flex flex-col items-center rounded-2xl py-6">
              <RiskGauge score={result.score} size={150} label="Safety" />
              <p className="mt-2 font-display text-base font-bold text-score-danger">{result.verdict}</p>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground"><LinkIcon className="h-3.5 w-3.5 text-cyber-blue" /> URLs Found</h3>
              <div className="space-y-2">
                {result.extractedUrls.map((u, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-muted p-3">
                    <span className="min-w-0 truncate text-xs text-foreground">{u.url}</span>
                    <div className="ml-2 flex shrink-0 items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground">{u.score}</span>
                      {u.verdict === "Safe" ? <CheckCircle className="h-3.5 w-3.5 text-score-safe" /> : u.verdict === "Suspicious" ? <AlertTriangle className="h-3.5 w-3.5 text-score-warning" /> : <XCircle className="h-3.5 w-3.5 text-score-danger" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground"><AlertTriangle className="h-3.5 w-3.5 text-score-danger" /> Patterns</h3>
              <ul className="space-y-2">
                {result.patterns.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-score-danger" />
                    <span className="text-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MobileEmailAnalysis;
