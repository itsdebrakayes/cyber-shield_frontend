import React from "react";

interface RiskGaugeProps {
  score: number; // 0-100
  size?: number;
  label?: string;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score, size = 160, label }) => {
  const center = size / 2;
  const radius = (size - 30) / 2;
  const startAngle = 180; // left
  const endAngle = 0; // right (semicircle)
  const totalAngle = 180;

  // Needle angle: 180 (left/0%) to 0 (right/100%)
  const needleAngle = startAngle - (score / 100) * totalAngle;
  const needleRad = (needleAngle * Math.PI) / 180;
  const needleLen = radius - 14;
  const needleX = center + needleLen * Math.cos(needleRad);
  const needleY = center - needleLen * Math.sin(needleRad);

  // Arc path helper
  const arcPath = (r: number, startDeg: number, endDeg: number) => {
    const s = (startDeg * Math.PI) / 180;
    const e = (endDeg * Math.PI) / 180;
    const x1 = center + r * Math.cos(Math.PI - s);
    const y1 = center - r * Math.sin(Math.PI - s);
    const x2 = center + r * Math.cos(Math.PI - e);
    const y2 = center - r * Math.sin(Math.PI - e);
    const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Tick marks
  const ticks = [];
  for (let i = 0; i <= 10; i++) {
    const angle = ((180 - (i / 10) * 180) * Math.PI) / 180;
    const outerR = radius + 2;
    const innerR = i % 5 === 0 ? radius - 10 : radius - 6;
    ticks.push({
      x1: center + outerR * Math.cos(angle),
      y1: center - outerR * Math.sin(angle),
      x2: center + innerR * Math.cos(angle),
      y2: center - innerR * Math.sin(angle),
      major: i % 5 === 0,
    });
  }

  const getColor = () => {
    if (score >= 70) return "hsl(var(--score-safe))";
    if (score >= 40) return "hsl(var(--score-warning))";
    return "hsl(var(--score-danger))";
  };

  const getLabel = () => {
    if (score >= 70) return "Safe";
    if (score >= 40) return "Caution";
    return "Danger";
  };

  const gradientId = `gauge-grad-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={size}
        height={size / 2 + 24}
        viewBox={`0 0 ${size} ${size / 2 + 24}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--score-danger))" />
            <stop offset="40%" stopColor="hsl(var(--score-warning))" />
            <stop offset="100%" stopColor="hsl(var(--score-safe))" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <path
          d={arcPath(radius, 0, 180)}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Colored arc */}
        <path
          d={arcPath(radius, 0, 180)}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Tick marks */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={t.major ? 2 : 1}
            opacity={t.major ? 0.6 : 0.3}
          />
        ))}

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={needleX}
          y2={needleY}
          stroke={getColor()}
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Needle center dot */}
        <circle cx={center} cy={center} r="5" fill={getColor()} />
        <circle cx={center} cy={center} r="2.5" fill="hsl(var(--background))" />

        {/* Score text */}
        <text
          x={center}
          y={center + 20}
          textAnchor="middle"
          className="fill-foreground font-display"
          fontSize={size * 0.16}
          fontWeight="700"
        >
          {score}%
        </text>
        <text
          x={center}
          y={center + 20 + size * 0.1}
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize={size * 0.08}
          fontWeight="500"
        >
          {label || getLabel()}
        </text>
      </svg>
    </div>
  );
};

export default RiskGauge;
