import React from 'react';

interface StatBarProps {
  label: string;
  fullName: string;
  value: number;
  isPrimary?: boolean;
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  fullName,
  value,
  isPrimary = false,
}) => {
  // Standard D&D modifier calculation: floor((score - 10) / 2)
  const modifier = Math.floor((value - 10) / 2);
  const modSign = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  // Percentage based on max typical stat 20
  const percentage = Math.min(100, Math.max(15, (value / 20) * 100));

  return (
    <div className="flex flex-col gap-1.5 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-mono font-bold tracking-wider ${
              isPrimary ? 'text-amber-400' : 'text-slate-300'
            }`}
          >
            {label}
          </span>
          <span className="text-slate-500 hidden sm:inline">· {fullName}</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono tabular-nums">
          <span className="text-slate-100 font-semibold text-sm">{value}</span>
          <span
            className={`text-xs px-1 rounded ${
              modifier >= 0 ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40'
            }`}
          >
            {modSign}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            isPrimary
              ? 'bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.5)]'
              : 'bg-gradient-to-r from-slate-500 to-slate-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
