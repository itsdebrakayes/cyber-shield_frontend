import React from "react";

interface RiskGaugeProps {
  score: number; // 0-100
  size?: number;
  label?: string;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score, size = 160, label }) => {
  const radius = (size - 20) / 2;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;
  const center = size / 2;

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

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        {/* Background arc */}
        <path
          d={`M 10 ${center} A ${radius} ${radius} 0 0 1 ${size - 10} ${center}`}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={`M 10 ${center} A ${radius} ${radius} 0 0 1 ${size - 10} ${center}`}
          fill="none"
          stroke={getColor()}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          className="transition-all duration-1000 ease-out"
        />
        {/* Score text */}
        <text x={center} y={center - 8} textAnchor="middle" className="fill-foreground font-display text-2xl font-bold" fontSize={size * 0.18}>
          {score}%
        </text>
        <text x={center} y={center + 12} textAnchor="middle" className="fill-muted-foreground text-sm" fontSize={size * 0.09}>
          {label || getLabel()}
        </text>
      </svg>
    </div>
  );
};

export default RiskGauge;
