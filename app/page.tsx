"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode, type CSSProperties } from "react";

/* ═══════════════════════════════════════════════════════════════════
   COLOR SYSTEM — each card/section gets its own personality
   ═══════════════════════════════════════════════════════════════════ */

const C = {
  blue: "#6366f1",
  purple: "#a855f7",
  pink: "#ec4899",
  cyan: "#06b6d4",
  emerald: "#10b981",
  amber: "#f59e0b",
};

/* ═══════════════════════════════════════════════════════════════════
   DATA — numbers preserved exactly
   ═══════════════════════════════════════════════════════════════════ */

const STATS = [
  { val: "0k+", label: "Total Views", color: C.blue },
  { val: "0%", label: "Avg. Engagement", color: C.purple },
  { val: "0", label: "Brand Deals", color: C.pink },
];

const SKILLS = [
  { name: "Short-Form Video", color: C.blue },
  { name: "Brand Strategy", color: C.purple },
  { name: "Copywriting", color: C.pink },
  { name: "Audience Growth", color: C.cyan },
  { name: "Trend Analysis", color: C.emerald },
  { name: "Content Direction", color: C.amber },
];

const WORK = [
  {
    title: "Reels & Shorts",
    desc: "Hook in one second. Retain for sixty. High-energy, fast-paced content built for maximum retention and shares.",
    tags: ["Instagram", "TikTok", "YouTube"],
    color: C.blue,
  },
  {
    title: "Storytelling",
    desc: "Long-form narratives that make people feel. Documenting real moments with cinematic precision.",
    tags: ["YouTube", "Podcasts"],
    color: C.purple,
  },
  {
    title: "Educational",
    desc: "Breaking down complex topics into content that entertains and teaches simultaneously.",
    tags: ["Carousel", "Threads", "Video"],
    color: C.pink,
  },
  {
    title: "Viral Campaigns",
    desc: "Campaign ideation, trend riding, and cultural moments. Built to spread, not just perform.",
    tags: ["Trends", "UGC", "Branded"],
    color: C.cyan,
  },
];

const BRANDS = [
  {
    name: "NovaTech",
    cat: "Consumer Electronics",
    color: C.blue,
    stats: [
      { v: "8.2M", l: "Total Views" },
      { v: "11.4%", l: "Engagement" },
      { v: "340K", l: "Reach" },
      { v: "+28%", l: "Brand Lift" },
    ],
  },
  {
    name: "Greenleaf Co.",
    cat: "Wellness & Lifestyle",
    color: C.emerald,
    stats: [
      { v: "5.6M", l: "Total Views" },
      { v: "9.8%", l: "Engagement" },
      { v: "210K", l: "Reach" },
      { v: "3.2x", l: "ROAS" },
    ],
  },
  {
    name: "StrideLab",
    cat: "Footwear & Apparel",
    color: C.purple,
    stats: [
      { v: "14M", l: "Total Views" },
      { v: "13.1%", l: "Engagement" },
      { v: "580K", l: "Reach" },
      { v: "Viral", l: "Campaign Status" },
    ],
  },
];

const PLANS = [
  {
    name: "Starter", price: "₹25K", per: "per deliverable", color: C.blue,
    features: ["1 Short-Form Reel (60s)", "Scripting & Concept", "Basic post-production", "1 revision round", "Raw footage included"],
    cta: "Get Started",
  },
  {
    name: "Growth", price: "₹75K", per: "per campaign", color: C.purple, pop: true,
    features: ["3 Short-Form Reels + 1 Long-Form", "Full creative direction & scripting", "Premium post-production & color grade", "Cross-platform distribution strategy", "3 revision rounds", "Performance report included"],
    cta: "Start Campaign",
  },
  {
    name: "Retainer", price: "₹1.8L", per: "per month", color: C.pink,
    features: ["8–12 pieces of content/month", "Dedicated creative partnership", "Brand strategy & content calendar", "Priority turnaround & response", "Unlimited revisions", "Monthly analytics & insights call"],
    cta: "Let's Talk",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════ */

function go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

function useSr(t = 0.12) {
  const r = useRef<HTMLDivElement>(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { sv(true); io.unobserve(el); } }, { threshold: t });
    io.observe(el);
    return () => io.disconnect();
  }, [t]);
  return { r, v };
}

/* ═══════════════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════════════ */

function Sr({ children, delay = 0, className = "", style }: {
  children: ReactNode; delay?: number; className?: string; style?: CSSProperties;
}) {
  const { r, v } = useSr();
  return (
    <div ref={r} className={`sr ${v ? "v" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function GlowCard({ children, className = "", style, accent }: {
  children: ReactNode; className?: string; style?: CSSProperties; accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const move = useCallback((e: React.MouseEvent) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b || !ref.current) return;
    ref.current.style.setProperty("--mx", `${e.clientX - b.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - b.top}px`);
  }, []);
  return (
    <div ref={ref} className={`card ${className}`}
      style={{
        ...style,
        ...(accent ? {
          "--card-accent": accent,
          borderImage: undefined,
        } as CSSProperties : {}),
      }}
      onMouseMove={move}>
      {children}
    </div>
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0, raf: number;
    const m = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.1; y += (ty - y) * 0.1;
      if (ref.current) { ref.current.style.left = `${x}px`; ref.current.style.top = `${y}px`; }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", m, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", m); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="cursor-glow" />;
}

/* ─── INTERACTIVE DOT GRID ──────────────────────────────────────── */

function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -500, y: -500 });
  const scrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0, h = 0;
    const GAP = 38; // distance between dots
    const BASE_R = 1;  // base dot radius
    const MAX_R = 3.5; // max dot radius near cursor
    const RADIUS = 250; // cursor influence radius

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y + scrollY.current;

      const startCol = Math.max(0, Math.floor((mx - RADIUS) / GAP));
      const endCol = Math.min(Math.floor(w / GAP), Math.ceil((mx + RADIUS) / GAP));
      const startRow = Math.max(0, Math.floor((my - RADIUS) / GAP));
      const endRow = Math.min(Math.floor(h / GAP), Math.ceil((my + RADIUS) / GAP));

      // Draw base grid (very faint) — only visible portion
      const vpTop = scrollY.current;
      const vpBottom = vpTop + window.innerHeight;
      const vpRowStart = Math.max(0, Math.floor(vpTop / GAP) - 1);
      const vpRowEnd = Math.min(Math.floor(h / GAP), Math.ceil(vpBottom / GAP) + 1);

      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      for (let row = vpRowStart; row <= vpRowEnd; row++) {
        for (let col = 0; col <= Math.floor(w / GAP); col++) {
          const dotX = col * GAP;
          const dotY = row * GAP;
          ctx.beginPath();
          ctx.arc(dotX, dotY, BASE_R, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw cursor-influenced dots
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const dotX = col * GAP;
          const dotY = row * GAP;
          const dx = dotX - mx;
          const dy = dotY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < RADIUS) {
            const t = 1 - dist / RADIUS; // 0 at edge, 1 at center
            const ease = t * t; // quadratic ease
            const r = BASE_R + (MAX_R - BASE_R) * ease;
            const alpha = 0.06 + 0.55 * ease;

            // Color shifts from cool blue at edge to bright purple at center
            const red = Math.round(99 + (168 - 99) * ease);   // 99 → 168
            const green = Math.round(102 + (85 - 102) * ease); // 102 → 85
            const blue = Math.round(241 + (247 - 241) * ease); // 241 → 247

            ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(dotX, dotY, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    onScroll();
    raf = requestAnimationFrame(draw);

    // Re-measure height when content loads/changes
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-grid"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

function Label({ children, color = "var(--blue)" }: { children: ReactNode; color?: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, marginBottom: 10,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
      textTransform: "uppercase" as const, color,
    }}>
      <span style={{ width: 20, height: 2, background: color, borderRadius: 1 }} />
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════════ */

function Nav() {
  const [s, ss] = useState(false);
  useEffect(() => {
    const fn = () => ss(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 48, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 20px",
      background: s ? "rgba(8,8,12,0.85)" : "transparent",
      backdropFilter: s ? "blur(20px) saturate(180%)" : "none",
      WebkitBackdropFilter: s ? "blur(20px) saturate(180%)" : "none",
      borderBottom: s ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      transition: "all 0.4s var(--ease)",
      opacity: s ? 1 : 0, pointerEvents: s ? "auto" : "none",
    }}>
      <div style={{ maxWidth: 1080, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", textDecoration: "none", letterSpacing: "-0.02em" }}>
          swayanshu<span style={{ color: C.purple }}>.</span>
        </a>
        <div className="hide-m" style={{ display: "flex", gap: 24 }}>
          {["About", "Work", "Pricing", "Contact"].map(n => (
            <button key={n} onClick={() => go(n.toLowerCase())}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-dim)", fontSize: 12, fontWeight: 400, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}>
              {n}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO — Vibrant, colorful, compact
   ═══════════════════════════════════════════════════════════════════ */

function Hero() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 50); }, []);
  const anim = (d: number) => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(24px)",
    filter: on ? "blur(0)" : "blur(3px)",
    transition: `opacity 0.8s var(--ease) ${d}s, transform 0.8s var(--ease) ${d}s, filter 0.8s var(--ease) ${d}s`,
  });

  return (
    <section style={{
      minHeight: "92vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "60px 20px 40px", position: "relative", overflow: "hidden",
    }}>
      {/* Colorful gradient orbs */}
      <div className="hero-bg-orb" style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        top: "-10%", left: "50%", transform: "translateX(-50%)",
        background: `radial-gradient(circle, ${C.blue}18 0%, ${C.purple}10 40%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div className="hero-bg-orb" style={{
        position: "absolute", width: 350, height: 350, borderRadius: "50%",
        bottom: "5%", right: "-5%",
        background: `radial-gradient(circle, ${C.pink}0d 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div className="hero-bg-orb" style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        top: "30%", left: "-5%",
        background: `radial-gradient(circle, ${C.cyan}08 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Available badge */}
      <div style={{ ...anim(0.1), display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        <span style={{
          width: 7, height: 7, borderRadius: "50%", background: C.emerald,
          boxShadow: `0 0 10px ${C.emerald}60`,
          animation: "pulse-dot 2.5s ease-in-out infinite",
        }} />
        <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Available for Collaborations
        </span>
      </div>

      {/* Headline */}
      <h1 style={{
        ...anim(0.2),
        fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 700,
        lineHeight: 1.08, letterSpacing: "-0.035em",
        maxWidth: 720, marginBottom: 16,
      }}>
        Content that<br />
        <span className="grad-shimmer">stops the scroll.</span>
      </h1>

      {/* Subhead */}
      <p style={{
        ...anim(0.35),
        fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
        color: "var(--text-dim)", maxWidth: 440, marginBottom: 28,
        fontWeight: 400, lineHeight: 1.6,
      }}>
        I turn brands into stories people actually care about — reels,
        long-form, campaigns, and everything in between.
      </p>

      {/* CTAs */}
      <div style={{ ...anim(0.5), display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
        <button onClick={() => go("work")} style={{
          padding: "11px 26px", borderRadius: 980, border: "none", cursor: "pointer",
          background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
          color: "#fff", fontSize: 14, fontWeight: 500,
          transition: "all 0.3s var(--ease)", letterSpacing: "-0.01em",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 8px 28px ${C.blue}40`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
          View My Work →
        </button>
        <button onClick={() => go("contact")} style={{
          padding: "11px 26px", borderRadius: 980, cursor: "pointer",
          background: "transparent", border: `1px solid ${C.purple}40`,
          color: C.purple, fontSize: 14, fontWeight: 500,
          transition: "all 0.3s var(--ease)",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.purple; e.currentTarget.style.background = `${C.purple}10`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.purple}40`; e.currentTarget.style.background = "transparent"; }}>
          Get in Touch
        </button>
      </div>

      {/* Stats — colorful */}
      <div className="stats-row" style={{ ...anim(0.65), display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
        {STATS.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700,
              letterSpacing: "-0.03em", color: s.color, lineHeight: 1,
            }}>
              {s.val}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
        opacity: on ? 0.3 : 0, transition: "opacity 0.8s ease 1s",
        animation: "float-subtle 2s ease-in-out infinite",
      }}>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M8 2v14m0 0l5-5m-5 5L3 11" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ABOUT — Tight 2-col, colorful skills
   ═══════════════════════════════════════════════════════════════════ */

function About() {
  return (
    <section id="about" style={{ padding: "60px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 20px" }}>
        <Sr><Label color={C.purple}>About</Label></Sr>
        <div className="g2" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "start" }}>
          <div>
            <Sr>
              <h2 style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700,
                lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: 18,
              }}>
                I don&apos;t just post content.<br />
                <span className="grad">I build audiences.</span>
              </h2>
            </Sr>
            <Sr delay={0.05}>
              <p style={{ fontSize: 15, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 12 }}>
                5+ years turning brands from zero to millions. Every second of content
                earns the next — no filler, no fluff. Just stories that connect and convert.
              </p>
            </Sr>
            <Sr delay={0.1}>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 20 }}>
                From viral Reels to long-form YouTube essays, I treat every piece
                like a performance. Brands trust me because I only work with products I genuinely believe in.
              </p>
            </Sr>
            <Sr delay={0.15}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {SKILLS.map(s => (
                  <span key={s.name} className="chip" style={{
                    color: s.color,
                    background: `${s.color}12`,
                    border: `1px solid ${s.color}20`,
                  }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </Sr>
          </div>

          <Sr delay={0.08} className="hide-m">
            <GlowCard style={{ padding: 0, overflow: "hidden" }}>
              <div style={{
                background: `linear-gradient(135deg, #111118, #0c0c14)`,
                aspectRatio: "4/5", display: "flex", alignItems: "center",
                justifyContent: "center", position: "relative",
              }}>
                {/* Colorful abstract shapes */}
                <div style={{
                  position: "absolute", width: 140, height: 140, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.blue}30, ${C.purple}20)`,
                  filter: "blur(50px)",
                }} />
                <div style={{
                  width: 72, height: 72, borderRadius: 20, transform: "rotate(15deg)",
                  background: `linear-gradient(135deg, ${C.blue}30, ${C.purple}25)`,
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                }} />
                <div style={{
                  position: "absolute", width: 40, height: 40, borderRadius: 12,
                  background: `linear-gradient(135deg, ${C.pink}25, ${C.purple}20)`,
                  border: "1px solid rgba(255,255,255,0.06)",
                  top: "28%", right: "25%", transform: "rotate(-10deg)",
                }} />
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Swayanshu</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>Odisha, India · Remote</div>
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "3px 9px", borderRadius: 6,
                    background: `${C.emerald}12`, border: `1px solid ${C.emerald}20`,
                    fontSize: 10.5, fontWeight: 500, color: C.emerald,
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%", background: C.emerald,
                      animation: "pulse-dot 2s ease-in-out infinite",
                    }} />
                    Online
                  </div>
                </div>
              </div>
            </GlowCard>
          </Sr>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   WORK — Colored accent borders, numbered cards
   ═══════════════════════════════════════════════════════════════════ */

function Work() {
  return (
    <section id="work" style={{ padding: "60px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 20px" }}>
        <Sr><Label color={C.blue}>What I Create</Label></Sr>
        <Sr delay={0.04}>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700,
            lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: 8,
          }}>
            Built for <span className="grad">performance.</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 400, marginBottom: 32 }}>
            Every piece is crafted with intention and designed to resonate.
          </p>
        </Sr>

        <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {WORK.map((w, i) => (
            <Sr key={w.title} delay={i * 0.05}>
              <GlowCard style={{
                padding: "28px 24px", height: "100%",
                display: "flex", flexDirection: "column",
                borderLeft: `2px solid ${w.color}`,
              }}>
                {/* Faded number watermark */}
                <span style={{
                  fontSize: 56, fontWeight: 800, lineHeight: 1,
                  letterSpacing: "-0.04em", color: `${w.color}0a`,
                  position: "absolute", top: 12, right: 16,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  0{i + 1}
                </span>
                <h3 style={{
                  fontSize: 17, fontWeight: 600, marginBottom: 8,
                  color: "var(--text)", letterSpacing: "-0.01em", position: "relative",
                }}>
                  {w.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.55, flex: 1, marginBottom: 14, position: "relative" }}>
                  {w.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, position: "relative" }}>
                  {w.tags.map(t => (
                    <span key={t} className="chip" style={{
                      color: w.color, background: `${w.color}10`, border: `1px solid ${w.color}18`,
                    }}>{t}</span>
                  ))}
                </div>
              </GlowCard>
            </Sr>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BRANDS — Colored stat values
   ═══════════════════════════════════════════════════════════════════ */

function Brands() {
  return (
    <section id="collabs" style={{ padding: "60px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 20px" }}>
        <Sr><Label color={C.emerald}>Collaborations</Label></Sr>
        <Sr delay={0.04}>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700,
            lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: 8,
          }}>
            Real campaigns. <span className="grad">Real results.</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 400, marginBottom: 32 }}>
            What happens when creativity meets strategy.
          </p>
        </Sr>

        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {BRANDS.map((b, i) => (
            <Sr key={b.name} delay={i * 0.06}>
              <GlowCard style={{
                padding: "24px", display: "flex", flexDirection: "column", gap: 20,
                borderTop: `2px solid ${b.color}`,
              }}>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.01em" }}>
                    {b.name}
                  </h3>
                  <p style={{ fontSize: 11.5, color: "var(--text-muted)", letterSpacing: "0.02em", marginTop: 2 }}>
                    {b.cat}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {b.stats.map(s => (
                    <div key={s.l} style={{
                      padding: "12px 14px", borderRadius: 10,
                      background: `${b.color}06`, border: `1px solid ${b.color}12`,
                    }}>
                      <div style={{
                        fontSize: "clamp(1.1rem, 2vw, 1.35rem)", fontWeight: 700,
                        letterSpacing: "-0.02em", color: b.color, lineHeight: 1,
                      }}>
                        {s.v}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </Sr>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PRICING — Colorful accents
   ═══════════════════════════════════════════════════════════════════ */

function Pricing() {
  return (
    <section id="pricing" style={{ padding: "60px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 20px" }}>
        <Sr><Label color={C.pink}>Packages</Label></Sr>
        <Sr delay={0.04}>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700,
            lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: 8,
          }}>
            Simple, <span className="grad">transparent</span> pricing.
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 400, marginBottom: 32 }}>
            Choose what fits. Every package is built for results.
          </p>
        </Sr>

        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, alignItems: "stretch" }}>
          {PLANS.map((p, i) => (
            <Sr key={p.name} delay={i * 0.06} style={{ display: "flex" }}>
              <GlowCard style={{
                padding: "28px 24px", display: "flex", flexDirection: "column", flex: 1,
                borderTop: `2px solid ${p.color}`,
                ...(p.pop ? { background: `${p.color}06`, border: `1px solid ${p.color}25`, borderTop: `2px solid ${p.color}` } : {}),
              }}>
                {p.pop && (
                  <span style={{
                    display: "inline-block", alignSelf: "flex-start", marginBottom: 12,
                    padding: "3px 9px", borderRadius: 6,
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.04em",
                    background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
                    color: "#fff", textTransform: "uppercase",
                  }}>Most Popular</span>
                )}
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>
                  {p.name}
                </p>
                <div style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.5rem)", fontWeight: 700,
                  letterSpacing: "-0.04em", color: p.color, lineHeight: 1.1,
                }}>
                  {p.price}
                </div>
                <p style={{ fontSize: 12.5, color: "var(--text-muted)", marginBottom: 20 }}>{p.per}</p>

                <div style={{ height: 1, background: "var(--border)", marginBottom: 16 }} />

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "start", gap: 8, fontSize: 13, color: "var(--text-dim)" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M3 8.5l3.5 3L13 5" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button onClick={() => go("contact")} style={{
                  width: "100%", padding: "11px 0", borderRadius: 980,
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                  transition: "all 0.3s var(--ease)",
                  background: p.pop ? `linear-gradient(135deg, ${C.blue}, ${C.purple})` : "transparent",
                  color: p.pop ? "#fff" : "var(--text)",
                  border: p.pop ? "none" : `1px solid var(--border)`,
                }}
                  onMouseEnter={e => {
                    if (!p.pop) { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.color = p.color; }
                    else { e.currentTarget.style.boxShadow = `0 6px 24px ${C.blue}35`; }
                  }}
                  onMouseLeave={e => {
                    if (!p.pop) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }
                    else { e.currentTarget.style.boxShadow = "none"; }
                  }}>
                  {p.cta}
                </button>
              </GlowCard>
            </Sr>
          ))}
        </div>

        <Sr>
          <GlowCard style={{ marginTop: 12, textAlign: "center", padding: "24px 28px" }}>
            <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 14 }}>
              Need something custom? Let&apos;s build a package that fits.
            </p>
            <button onClick={() => go("contact")} style={{
              padding: "10px 24px", borderRadius: 980, border: "none", cursor: "pointer",
              background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
              color: "#fff", fontSize: 13, fontWeight: 500,
              transition: "all 0.3s var(--ease)",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 6px 24px ${C.blue}35`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
              Get in touch →
            </button>
          </GlowCard>
        </Sr>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer id="contact" style={{ padding: "60px 0 32px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 20px" }}>
        <Sr>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Label color={C.pink}>Let&apos;s Work Together</Label>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700,
              lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: 12,
            }}>
              Ready to make<br />
              <span className="grad-shimmer">something great?</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 380, margin: "0 auto 24px" }}>
              Let&apos;s turn your brand into a story worth sharing.
            </p>
            <a href="mailto:demo@nogamil.co" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "12px 28px", borderRadius: 980, textDecoration: "none",
              background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
              color: "#fff", fontSize: 14, fontWeight: 500,
              transition: "all 0.3s var(--ease)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 8px 28px ${C.blue}40`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              demo@nogamil.co →
            </a>
          </div>
        </Sr>

        <Sr delay={0.06}>
          <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 48 }}>
            {[
              { l: "Email", v: "demo@nogamil.co", c: C.blue },
              { l: "Phone", v: "+91 xxxxx xxxxx", c: C.purple },
              { l: "Location", v: "Odisha, India · Remote", c: C.pink },
            ].map(x => (
              <GlowCard key={x.l} style={{ padding: "16px 20px", borderLeft: `2px solid ${x.c}` }}>
                <p style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 3 }}>{x.l}</p>
                <p style={{ fontSize: 13.5, color: "var(--text)", fontWeight: 400 }}>{x.v}</p>
              </GlowCard>
            ))}
          </div>
        </Sr>

        <div style={{ height: 1, background: "var(--border)" }} />

        <div className="fbar" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 20, gap: 12, flexWrap: "wrap",
        }}>
          <a href="#" style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", textDecoration: "none", letterSpacing: "-0.02em" }}>
            swayanshu<span style={{ color: C.purple }}>.</span>
          </a>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { n: "IG", c: C.pink },
              { n: "YT", c: "#ff0000" },
              { n: "LI", c: C.blue },
              { n: "X", c: "var(--text-dim)" },
            ].map(s => (
              <a key={s.n} href="#" style={{
                width: 30, height: 30, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 600, color: "var(--text-muted)",
                background: "var(--bg-card)", border: "1px solid var(--border)",
                textDecoration: "none", transition: "all 0.2s var(--ease)",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.c; e.currentTarget.style.color = s.c; e.currentTarget.style.background = `${s.c}10`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "var(--bg-card)"; }}>
                {s.n}
              </a>
            ))}
          </div>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>© 2026 Swayanshu</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function Page() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", position: "relative" }}>
      <InteractiveGrid />
      <CursorGlow />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />
        <Hero />
        <About />
        <Work />
        <Brands />
        <Pricing />
        <Footer />
      </div>
    </main>
  );
}