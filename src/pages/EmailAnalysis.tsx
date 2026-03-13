import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, AlertTriangle, CheckCircle, XCircle, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import RiskGauge from "@/components/RiskGauge";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileEmailAnalysis from "@/pages/mobile/MobileEmailAnalysis";

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
    "Urgency language detected: 'Your account will be suspended'",
    "Mismatched reply-to address",
    "Suspicious shortened URL detected",
  ],
};

const EmailAnalysis: React.FC = () => {
  const isMobile = useIsMobile();
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

  if (isMobile) return <MobileEmailAnalysis />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Email / Phishing Analysis</h1>
        <p className="text-sm text-muted-foreground">Paste a raw email to scan for phishing and malicious links</p>
      </div>

      <Card><CardContent className="space-y-4 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2"><Label>Sender Email</Label><Input placeholder="sender@example.com" value={sender} onChange={(e) => setSender(e.target.value)} /></div>
          <div className="space-y-2"><Label>Subject</Label><Input placeholder="Email subject line" value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
        </div>
        <div className="space-y-2"><Label>Email Body</Label><Textarea placeholder="Paste the full email body here…" rows={6} value={body} onChange={(e) => setBody(e.target.value)} /></div>
        <Button onClick={handleScan} disabled={scanning || !body}>
          {scanning ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" /> : <><Send className="mr-2 h-4 w-4" /> Analyze Email</>}
        </Button>
      </CardContent></Card>

      {scanning && (
        <Card><CardContent className="flex flex-col items-center py-16">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-display text-lg font-semibold text-foreground">Analyzing email content…</p>
        </CardContent></Card>
      )}

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <Card><CardContent className="flex flex-col items-center py-8">
              <RiskGauge score={result.score} size={200} label="Safety" />
              <p className="mt-2 font-display text-lg font-bold text-score-danger">{result.verdict}</p>
            </CardContent></Card>

            <Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><LinkIcon className="h-4 w-4 text-cyber-blue" /> Extracted URLs</CardTitle></CardHeader>
              <CardContent><div className="space-y-2">
                {result.extractedUrls.map((u, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-muted p-3">
                    <span className="truncate text-sm text-foreground">{u.url}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{u.score}/100</span>
                      {u.verdict === "Safe" ? <CheckCircle className="h-4 w-4 text-score-safe" /> : u.verdict === "Suspicious" ? <AlertTriangle className="h-4 w-4 text-score-warning" /> : <XCircle className="h-4 w-4 text-score-danger" />}
                    </div>
                  </div>
                ))}
              </div></CardContent></Card>

            <Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><AlertTriangle className="h-4 w-4 text-score-danger" /> Suspicious Patterns</CardTitle></CardHeader>
              <CardContent><ul className="space-y-2">
                {result.patterns.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm"><XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-score-danger" /><span className="text-foreground">{p}</span></li>
                ))}
              </ul></CardContent></Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmailAnalysis;
