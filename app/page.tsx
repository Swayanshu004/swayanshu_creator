"use client";

import { useEffect, useRef, useState } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface ContentCard {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

interface CollabMetric {
  val: string;
  label: string;
}

interface Collab {
  icon: string;
  name: string;
  type: string;
  metrics: CollabMetric[];
}

interface PricingPlan {
  name: string;
  price: string;
  per: string;
  features: string[];
  recommended?: boolean;
  ctaLabel: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Work", "Pricing", "Contact"];

const STATS = [
  { num: "42M+", label: "Total Views" },
  { num: "8%", label: "Avg. Engagement" },
  { num: "60+", label: "Brand Deals" },
];

const CONTENT_CARDS: ContentCard[] = [
  {
    icon: "🎬",
    title: "Reels & Shorts",
    desc: "Hook in 1 second, retain for 60. High-energy, fast-paced content built for maximum retention and shares.",
    tags: ["Instagram", "TikTok", "YouTube"],
  },
  {
    icon: "📖",
    title: "Storytelling",
    desc: "Long-form narratives that make people feel. Documenting real moments with cinematic precision.",
    tags: ["YouTube", "Podcasts"],
  },
  {
    icon: "🧠",
    title: "Educational",
    desc: "Breaking down complex topics into content that entertains and teaches simultaneously. Infotainment done right.",
    tags: ["Carousel", "Threads", "Video"],
  },
  {
    icon: "🚀",
    title: "Viral Campaigns",
    desc: "Campaign ideation, trend riding, and cultural moments. Built to spread, not just perform.",
    tags: ["Trends", "UGC", "Branded"],
  },
];

const COLLABS: Collab[] = [
  {
    icon: "⚡",
    name: "NovaTech",
    type: "Consumer Electronics",
    metrics: [
      { val: "8.2M", label: "Total Views" },
      { val: "11.4%", label: "Engagement" },
      { val: "340K", label: "Reach" },
      { val: "+28%", label: "Brand Lift" },
    ],
  },
  {
    icon: "🌿",
    name: "Greenleaf Co.",
    type: "Wellness & Lifestyle",
    metrics: [
      { val: "5.6M", label: "Total Views" },
      { val: "9.8%", label: "Engagement" },
      { val: "210K", label: "Reach" },
      { val: "3.2x", label: "ROAS" },
    ],
  },
  {
    icon: "👟",
    name: "StrideLab",
    type: "Footwear & Apparel",
    metrics: [
      { val: "14M", label: "Total Views" },
      { val: "13.1%", label: "Engagement" },
      { val: "580K", label: "Reach" },
      { val: "Viral", label: "Campaign Status" },
    ],
  },
];

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "₹25K",
    per: "per deliverable",
    features: [
      "1 Short-Form Reel (60s)",
      "Scripting & Concept",
      "Basic post-production",
      "1 revision round",
      "Raw footage included",
    ],
    ctaLabel: "Get Started",
  },
  {
    name: "Growth",
    price: "₹75K",
    per: "per campaign",
    recommended: true,
    features: [
      "3 Short-Form Reels + 1 Long-Form",
      "Full creative direction & scripting",
      "Premium post-production & color grade",
      "Cross-platform distribution strategy",
      "3 revision rounds",
      "Performance report included",
    ],
    ctaLabel: "Start Campaign →",
  },
  {
    name: "Monthly Retainer",
    price: "₹1.8L",
    per: "per month",
    features: [
      "8–12 pieces of content/month",
      "Dedicated creative partnership",
      "Brand strategy & content calendar",
      "Priority turnaround & response",
      "Unlimited revisions",
      "Monthly analytics & insights call",
    ],
    ctaLabel: "Let's Talk",
  },
];

// ─── UTILS ────────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── REVEAL HOOK ──────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full border border-white/[0.07] text-[11px] tracking-widest uppercase text-[#A3FF12] bg-[rgba(163,255,18,0.12)] font-['Syne',sans-serif]">
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5 font-['Syne',sans-serif] text-[11px] tracking-[0.2em] uppercase text-[#A3FF12]">
      <span className="block w-7 h-px bg-[#A3FF12] shrink-0" />
      {children}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function BtnPrimary({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 bg-[#A3FF12] text-[#0B0B0B] font-['Syne',sans-serif] text-[13px] font-bold rounded-full border-none cursor-pointer tracking-tight transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(163,255,18,0.35)] ${className}`}
    >
      {children}
    </button>
  );
}

function BtnGhost({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-6 py-2.5 bg-transparent text-[#F5F5F5] font-['Syne',sans-serif] text-[13px] font-semibold rounded-full border border-white/[0.07] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A3FF12] hover:text-[#A3FF12]"
    >
      {children}
    </button>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3.5 bg-[rgba(11,11,11,0.85)] backdrop-blur-xl border-b border-white/[0.07]"
          : "py-5"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-8 flex items-center justify-between">
        <a
          href="#"
          className="font-['Syne',sans-serif] text-xl font-extrabold tracking-tight text-[#F5F5F5] no-underline"
        >
          SWAYANSHU<span className="text-[#A3FF12]">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-9 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link.toLowerCase())}
                className="bg-transparent border-none text-[#888] text-sm cursor-pointer font-['DM_Sans',sans-serif] transition-colors duration-200 hover:text-[#F5F5F5] p-0"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* <BtnPrimary onClick={() => scrollTo("contact")}>Work With Me</BtnPrimary> */}
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-[100px] pb-20 overflow-hidden"
    >
      {/* Glow orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full -top-24 -right-36 animate-[pulse_6s_ease-in-out_infinite] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(163,255,18,0.1) 0%, transparent 70%)" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full bottom-24 -left-24 animate-[pulse_8s_ease-in-out_infinite_reverse] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(163,255,18,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-[1180px] mx-auto px-8 w-full">
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* ── Left ── */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-7">
              <span className="w-2 h-2 rounded-full bg-[#A3FF12] shadow-[0_0_10px_#A3FF12] animate-[blink_2s_ease-in-out_infinite] shrink-0" />
              <span className="text-[13px] text-[#888] font-['Syne',sans-serif] tracking-[0.1em] uppercase">
                Available for Collaborations
              </span>
            </div>

            <h1 className="font-['Syne',sans-serif] text-[clamp(48px,6vw,80px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#F5F5F5] mb-6">
              Content that{" "}
              <em className="not-italic text-[#A3FF12]">stops</em>
              <br />
              the scroll.
            </h1>

            <p className="text-[17px] text-[#888] leading-[1.7] max-w-[500px] mb-10 font-light">
              I turn brands into stories people actually care about — short-form,
              long-form, viral campaigns, and everything in between.
            </p>

            <div className="flex gap-3.5 flex-wrap">
              <BtnPrimary onClick={() => scrollTo("collabs")}>View Work</BtnPrimary>
              <BtnGhost onClick={() => scrollTo("contact")}>Collaborate ↗</BtnGhost>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-9 mt-[52px] pt-10 border-t border-white/[0.07]">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-['Syne',sans-serif] text-[30px] font-extrabold text-[#F5F5F5] tracking-[-0.03em]">
                    {s.num}
                  </div>
                  <div className="text-xs text-[#888] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right card (hidden on mobile) ── */}
          <div className="relative hidden lg:block">
            <div className="relative bg-white/[0.04] border border-white/[0.07] rounded-[20px] p-8 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(163,255,18,0.06)] to-transparent pointer-events-none" />
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center text-[80px] mb-5">
                🎬
              </div>
              <div className="font-['Syne',sans-serif] text-[22px] font-bold text-[#F5F5F5] mb-1">
                SWAYANSHU
              </div>
              <div className="text-[13px] text-[#888] mb-4">
                Content Creator
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag>Storytelling</Tag>
                <Tag>Tech</Tag>
                <Tag>Documentry</Tag>
              </div>
            </div>

            {/* Floating pills */}
            <div
              className="absolute -top-5 -right-8 flex items-center gap-2.5 bg-[rgba(11,11,11,0.9)] border border-white/[0.07] rounded-full px-4 py-2.5 backdrop-blur-xl text-xs font-['Syne',sans-serif] font-semibold text-[#F5F5F5] whitespace-nowrap shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              style={{ animation: "float1 5s ease-in-out infinite" }}
            >
              <span className="text-lg">🔥</span>
              12M views this month
            </div>
            <div
              className="absolute top-10 -left-5 flex items-center gap-2.5 bg-[rgba(11,11,11,0.9)] border border-white/[0.07] rounded-full px-4 py-2.5 backdrop-blur-xl text-xs font-['Syne',sans-serif] font-semibold text-[#F5F5F5] whitespace-nowrap shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              style={{ animation: "float2 6s ease-in-out infinite" }}
            >
              <span className="text-lg">✅</span>
              Open to collabs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-[50px]">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <SectionLabel>About Me</SectionLabel>
            <h2 className="font-['Syne',sans-serif] text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#F5F5F5] mb-6">
              I don&apos;t just create. I{" "}
              <em className="not-italic text-[#A3FF12]">connect.</em>
            </h2>
            <p className="text-base text-[#aaa] leading-[1.8] mb-4 font-light">
              I&apos;m a content creator, brand strategist, and storyteller with 5+
              years of building audiences from zero to millions. My superpower?
              Making complex ideas feel effortlessly human.
            </p>
            <p className="text-base text-[#aaa] leading-[1.8] mb-4 font-light">
              From viral Reels to long-form YouTube essays, I approach every piece
              of content like a performance — where every second earns the next.
              Brands trust me to represent them authentically, because I only work
              with products I genuinely believe in.
            </p>
            <div className="flex flex-wrap gap-2 mt-7">
              {["Short-Form Video", "Brand Strategy", "Copywriting", "Audience Growth", "Trend Analysis"].map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative bg-white/[0.04] border border-white/[0.07] rounded-[20px] p-10 backdrop-blur-xl overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[#A3FF12] after:to-transparent">
              <div className="w-full aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#1c1c1c] to-[#111] flex items-center justify-center text-[100px] mb-6">
                🧑‍💻
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-['Syne',sans-serif] font-bold text-base text-[#F5F5F5]">
                    SWAYANSHU 
                  </div>
                  <div className="text-xs text-[#888] mt-0.5">Odisha, India & Remote</div>
                </div>
                <Tag>● Online</Tag>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── CONTENT STYLE ────────────────────────────────────────────────────────────

function ContentCardItem({ card }: { card: ContentCard }) {
  return (
    <div className="group relative bg-white/[0.04] border border-white/[0.07] rounded-[20px] p-8 backdrop-blur-xl cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(163,255,18,0.2)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(163,255,18,0.06)] overflow-hidden h-full">
      {/* Top glow line on hover */}
      <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A3FF12] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      <span className="text-4xl mb-5 block">{card.icon}</span>
      <div className="font-['Syne',sans-serif] text-xl font-bold text-[#F5F5F5] mb-3">{card.title}</div>
      <p className="text-sm text-[#888] leading-[1.65] mb-5">{card.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
    </div>
  );
}

function ContentStyle() {
  return (
    <section id="work" className="py-[50px]">
      <div className="max-w-[1180px] mx-auto px-8">
        <Reveal className="mb-[60px]">
          <SectionLabel>Content Style</SectionLabel>
          <h2 className="font-['Syne',sans-serif] text-[clamp(32px,4vw,52px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#F5F5F5]">
            What I <em className="not-italic text-[#A3FF12]">create.</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTENT_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05}>
              <ContentCardItem card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COLLABS ──────────────────────────────────────────────────────────────────

function Collabs() {
  return (
    <section id="collabs" className="py-[50px]">
      <div className="max-w-[1180px] mx-auto px-8">
        <Reveal className="mb-[60px]">
          <SectionLabel>Collaborations</SectionLabel>
          <h2 className="font-['Syne',sans-serif] text-[clamp(32px,4vw,52px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#F5F5F5]">
            Brands I&apos;ve{" "}
            <em className="not-italic text-[#A3FF12]">worked with.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {COLLABS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-[20px] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(163,255,18,0.2)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-white/[0.07] border border-white/[0.07] flex items-center justify-center text-2xl shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="font-['Syne',sans-serif] text-lg font-bold text-[#F5F5F5]">{c.name}</div>
                    <div className="text-xs text-[#888]">{c.type}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="bg-white/[0.03] rounded-lg p-3.5 border border-white/[0.07]">
                      <div className="font-['Syne',sans-serif] text-[22px] font-extrabold text-[#A3FF12] tracking-[-0.03em]">
                        {m.val}
                      </div>
                      <div className="text-[11px] text-[#888] mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={`relative rounded-[20px] p-9 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden h-full flex flex-col ${
        plan.recommended
          ? "bg-[rgba(163,255,18,0.04)] border-2 border-[rgba(163,255,18,0.35)]"
          : "bg-white/[0.04] border border-white/[0.07]"
      }`}
    >
      {plan.recommended && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(163,255,18,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="inline-flex items-center gap-1.5 bg-[#A3FF12] text-[#0B0B0B] font-['Syne',sans-serif] text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-5 self-start">
            ⭐ Recommended
          </div>
        </>
      )}

      <div className="font-['Syne',sans-serif] text-sm font-semibold text-[#888] tracking-[0.08em] uppercase mb-2">
        {plan.name}
      </div>
      <div className="font-['Syne',sans-serif] text-5xl font-extrabold tracking-[-0.04em] text-[#F5F5F5] mb-1">
        {plan.price}
      </div>
      <div className="text-[13px] text-[#888] mb-7">{plan.per}</div>

      <div className="h-px bg-white/[0.07] mb-6" />

      <ul className="list-none p-0 m-0 mb-8 space-y-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-[#bbb] leading-relaxed">
            <span className="text-[#A3FF12] font-bold text-xs mt-0.5 shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={() => scrollTo("contact")}
        className={`block w-full py-3.5 text-center rounded-full font-['Syne',sans-serif] text-[13px] font-bold cursor-pointer transition-all duration-300 mt-auto ${
          plan.recommended
            ? "bg-[#A3FF12] text-[#0B0B0B] border-none hover:shadow-[0_0_30px_rgba(163,255,18,0.35)] hover:-translate-y-0.5"
            : "bg-transparent text-[#F5F5F5] border border-white/[0.07] hover:border-[#A3FF12] hover:text-[#A3FF12]"
        }`}
      >
        {plan.ctaLabel}
      </button>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-[50px]">
      <div className="max-w-[1180px] mx-auto px-8">
        <Reveal className="mb-[60px]">
          <SectionLabel>Packages</SectionLabel>
          <h2 className="font-['Syne',sans-serif] text-[clamp(32px,4vw,52px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#F5F5F5]">
            Simple,{" "}
            <em className="not-italic text-[#A3FF12]">transparent</em> pricing.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5 items-stretch">
          {PRICING_PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.05} className="flex">
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 text-center p-8 bg-white/[0.04] border border-white/[0.07] rounded-[20px] backdrop-blur-xl">
            <p className="text-[#888] mb-5 text-[15px]">
              Every brand is different. Need something custom? Let&apos;s build a
              package that fits your exact goals.
            </p>
            <BtnPrimary onClick={() => scrollTo("contact")}>
              Get in touch for custom deals →
            </BtnPrimary>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="contact" className="pt-20 pb-10 border-t border-white/[0.07] relative overflow-hidden">
      {/* Decorative top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-[#A3FF12] to-transparent pointer-events-none" />

      <div className="max-w-[1180px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-[60px] items-start">
          {/* CTA */}
          <Reveal>
            <SectionLabel>Let&apos;s Work Together</SectionLabel>
            <div className="font-['Syne',sans-serif] text-[clamp(28px,3.5vw,46px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-[#F5F5F5] mb-5">
              Ready to make{" "}
              <em className="not-italic text-[#A3FF12]">something</em> great?
            </div>
            <a
              href="mailto:hello@alexmercer.co"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#A3FF12] text-[#0B0B0B] font-['Syne',sans-serif] text-[13px] font-bold rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(163,255,18,0.35)]"
            >
              demo@nogamil.co →
            </a>
          </Reveal>

          {/* Contact info */}
          <Reveal delay={0.1} className="pt-2">
            {[
              { icon: "✉️", text: "demo@nogamil.co", href: "#" },
              { icon: "📞", text: "+91 xxxxx xxxxx", href: "#" },
              { icon: "📍", text: "Odisha, India — Remote Friendly", href: "#" },
            ].map((item) => (
              <a
                key={item.text}
                href={item.href}
                className="flex items-center gap-4 mb-4 text-[#888] text-[15px] no-underline transition-colors duration-200 hover:text-[#F5F5F5]"
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-base shrink-0">
                  {item.icon}
                </div>
                {item.text}
              </a>
            ))}
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.07] gap-5">
          <a href="#" className="font-['Syne',sans-serif] text-lg font-extrabold text-[#F5F5F5] no-underline">
            SWAYANSHU<span className="text-[#A3FF12]">.</span>
          </a>

          <div className="flex gap-3">
            {[
              { icon: "📸", label: "Instagram" },
              { icon: "▶️", label: "YouTube" },
              { icon: "💼", label: "LinkedIn" },
              { icon: "🐦", label: "Twitter" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                title={s.label}
                className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-base no-underline transition-all duration-300 hover:border-[#A3FF12] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(163,255,18,0.15)]"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="text-xs text-[#888]">© 2026 Swayanshu. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

// ─── GLOBAL KEYFRAMES ─────────────────────────────────────────────────────────
// Injected once at the top level. Tailwind v3 can't generate custom @keyframes
// without tailwind.config.js changes, so we drop them here as a thin <style> tag.

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

      html { scroll-behavior: smooth; }

      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #0B0B0B; }
      ::-webkit-scrollbar-thumb { background: #A3FF12; border-radius: 2px; }

      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50%       { transform: scale(1.15); opacity: 0.7; }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.3; }
      }
      @keyframes float1 {
        0%, 100% { transform: translateY(0) rotate(-2deg); }
        50%       { transform: translateY(-10px) rotate(1deg); }
      }
      @keyframes float2 {
        0%, 100% { transform: translateY(0) rotate(2deg); }
        50%       { transform: translateY(8px) rotate(-1deg); }
      }
    `}</style>
  );
}

// ─── PAGE (drop this into app/page.tsx) ───────────────────────────────────────

export default function PortfolioPage() {
  return (
    <main className="bg-[#0B0B0B] text-[#F5F5F5] font-['DM_Sans',sans-serif] leading-relaxed overflow-x-hidden">
      <GlobalStyles />
      <Nav />
      <Hero />
      <About />
      <ContentStyle />
      <Collabs />
      <Pricing />
      <Footer />
    </main>
  );
}