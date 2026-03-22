export const TIER_STYLES = {
  platinum: {
    badge: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/40',
    glow: 'shadow-[inset_0_0_20px_rgba(103,232,249,0.04)]',
    earnedBorder: 'border-cyan-500/30',
  },
  gold: {
    badge: 'text-yellow-400 border-yellow-500/40 bg-yellow-950/40',
    glow: 'shadow-[inset_0_0_20px_rgba(251,191,36,0.04)]',
    earnedBorder: 'border-yellow-500/30',
  },
  silver: {
    badge: 'text-slate-300 border-slate-500/40 bg-slate-900/40',
    glow: 'shadow-[inset_0_0_20px_rgba(203,213,225,0.03)]',
    earnedBorder: 'border-slate-400/30',
  },
  bronze: {
    badge: 'text-amber-500 border-amber-700/40 bg-amber-950/40',
    glow: 'shadow-[inset_0_0_20px_rgba(217,119,6,0.04)]',
    earnedBorder: 'border-amber-600/30',
  },
} as const
