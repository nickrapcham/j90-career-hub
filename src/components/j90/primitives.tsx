import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  action,
  accent,
  className,
  bodyClassName,
  children,
}: {
  title?: string;
  action?: ReactNode;
  accent?: boolean;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("panel flex min-h-0 flex-col p-3", accent && "panel-accent", className)}>
      {title ? (
        <header className="mb-2 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="panel-title truncate">{title}</h3>
            {action}
          </div>
          <div className="hairline mt-1.5" />
        </header>
      ) : null}
      <div className={cn("min-h-0 flex-1", bodyClassName)}>{children}</div>
    </section>
  );
}

export function Bar({ value, tone = "gold" }: { value: number; tone?: "gold" | "info" }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="h-[0.45rem] w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${pct}%`,
          background:
            tone === "gold"
              ? "linear-gradient(90deg, oklch(0.72 0.12 80), oklch(0.88 0.15 92))"
              : "linear-gradient(90deg, #168bff, #55c7f3)",
        }}
      />
    </div>
  );
}

export function Donut({
  wins,
  draws,
  losses,
  size = 116,
}: {
  wins: number;
  draws: number;
  losses: number;
  size?: number;
}) {
  const total = Math.max(1, wins + draws + losses);
  const r = size / 2 - 9;
  const c = 2 * Math.PI * r;
  const segs = [
    { v: wins, color: "oklch(0.78 0.19 150)" },
    { v: draws, color: "oklch(0.85 0.17 92)" },
    { v: losses, color: "oklch(0.63 0.22 25)" },
  ];
  let offset = 0;
  const pct = Math.round((wins / total) * 100);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="oklch(0.28 0.05 255)" strokeWidth="9" />
        {segs.map((s, i) => {
          const len = (s.v / total) * c;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="9"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="stat-number text-xl text-gold">{pct}%</span>
        <span className="text-[0.6rem] uppercase tracking-widest text-muted-foreground">
          {wins}V {draws}E {losses}D
        </span>
      </div>
    </div>
  );
}

export function Money({ value, signed }: { value: number; signed?: boolean }) {
  const abs = Math.abs(value);
  const txt = abs >= 1_000_000 ? `${(abs / 1_000_000).toFixed(2)}M` : abs >= 1000 ? `${Math.round(abs / 1000)}K` : String(abs);
  return <span>{signed ? (value < 0 ? "−" : "+") : ""}{txt}</span>;
}

export function formatCoins(value: number) {
  const abs = Math.abs(value);
  const txt =
    abs >= 1_000_000 ? `${(abs / 1_000_000).toFixed(2)}M` : abs >= 1000 ? `${Math.round(abs / 1000)}K` : String(Math.round(abs));
  return `${value < 0 ? "−" : ""}${txt}`;
}
