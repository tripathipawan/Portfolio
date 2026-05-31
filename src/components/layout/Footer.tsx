import { Link } from "react-scroll";
import type { IconType } from "react-icons";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaCodepen,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
import { personal, socials } from "../../data/index";
import { useScrollY, useScrollProgress } from "../../hooks/index";
import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, IconType> = {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaCodepen,
  FaWhatsapp,
  FaFacebook,
};

interface Social {
  name: string;
  icon: string;
  url: string;
  color: string;
}

export function SocialIcon({ s, size = 18 }: { s: Social; size?: number }) {
  const Icon = ICON_MAP[s.icon];
  if (!Icon) return null;
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      title={s.name}
      className="w-10 h-10 rounded-xl flex items-center justify-center neu-sm hover:-translate-y-1 hover:scale-110 transition-all duration-200"
      style={{ color: "var(--text2)" }}
      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = s.color)
      }
      onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "")
      }
    >
      <Icon size={size} />
    </a>
  );
}

export function ScrollToTop() {
  const y = useScrollY();
  const prog = useScrollProgress();
  const R = 18;
  const C = 2 * Math.PI * R;
  if (y <= 400) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[200] w-12 h-12 rounded-full flex items-center justify-center neu-sm hover:scale-110 transition-transform duration-200"
      style={{
        animation: "fadeInScale 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
      }}
    >
      <svg
        width="48"
        height="48"
        className="absolute top-0 left-0"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="rgba(99,102,241,0.15)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - prog)}
          style={{ transition: "stroke-dashoffset 0.12s ease" }}
        />
      </svg>
      <span
        className="relative z-10 text-sm g-text font-bold"
        style={{ marginTop: -2 }}
      >
        ↑
      </span>
    </button>
  );
}

/* ─── Marquee Section ─── */
function MarqueeSection() {
  const items = [
    "Open to collaborations",
    "Available for projects",
    "UI/UX · Dev · GenAI",
    "Based in India",
    "Let's build something incredible",
    "Open to collaborations",
    "Available for projects",
    "UI/UX · Dev · GenAI",
    "Based in India",
    "Let's build something incredible",
  ];

  return (
    <div
      className="overflow-hidden py-4"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* CSS-only marquee using existing marquee-track class from index.css */}
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 pr-6"
            style={{ color: "var(--text1)" }}
          >
            <span
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight select-none whitespace-nowrap"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                opacity: 0.22,
              }}
            >
              {item}
            </span>
            <span
              className="text-xl font-black"
              style={{ color: "#f97316", opacity: 0.8 }}
            >
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Middle Dark Section ─── */
function MiddleDarkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wordmarkRef.current && sectionRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { scale: 0.8, opacity: 1 },
          {
            scale: 1.05,
            opacity: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-16 sm:py-20 px-4 sm:px-6"
      style={{ background: "var(--bg1)" }}
    >
      <div
        ref={wordmarkRef}
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        // style={{ overflow: "hidden" }}
      >
        <span
          className="font-black leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(3rem, 12vw, 13rem)",
            color: "var(--text4)",
            opacity: 0.3,
            letterSpacing: "-0.02em",
            maxWidth: "100%",
            display: "block",
          }}
        >
          Pawan Tripathi
        </span>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-5">
        {/* Diamond logo */}
        <div
          className="w-11 h-11 sm:w-12 sm:h-12 border-2 flex items-center justify-center mb-1"
          style={{
            borderColor: "#f97316",
            transform: "rotate(45deg)",
            flexShrink: 0,
          }}
        >
          <div
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            style={{ background: "#f97316", transform: "rotate(-45deg)" }}
          />
        </div>

        {/* Name — uses theme text color */}
        <h2
          className="font-black leading-tight w-full"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(2.2rem, 6.5vw, 5rem)",
            letterSpacing: "-0.02em",
            wordBreak: "keep-all",
            color: "var(--text1)",
          }}
        >
          Pawan Tripathi
        </h2>

        {/* Subtitle */}
        <p
          className="text-xs tracking-widest uppercase"
          style={{
            fontFamily: "var(--mono)",
            color: "var(--text3)",
            letterSpacing: "0.28em",
          }}
        >
          React Developer &amp; TypeScript Developer
        </p>

        {/* Built with care */}
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
          />
          <span
            className="text-xs tracking-widest uppercase"
            style={{
              fontFamily: "var(--mono)",
              color: "var(--text3)",
              letterSpacing: "0.22em",
            }}
          >
            Built with care
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Footer ─── */
export default function Footer() {
  const NAV: string[] = [
    "home",
    "about",
    "services",
    "skills",
    "journey",
    "projects",
    "contact",
  ];

  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      {/* 1. Marquee */}
      <MarqueeSection />

      {/* 2. Middle Dark Section */}
      <MiddleDarkSection />

      {/* 3. Original Footer — same to same */}
      <div className="py-10 px-6">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <Link to="hero" smooth duration={700} className="cursor-pointer">
              <span
                className="text-2xl font-black g-text"
                style={{ fontFamily: "var(--font)" }}
              >
                Pawan Tripathi
              </span>
            </Link>
            <div className="flex flex-wrap justify-center gap-1">
              {NAV.map((id: string) => (
                <Link
                  key={id}
                  to={id}
                  smooth
                  duration={700}
                  offset={-64}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer capitalize transition-colors duration-200"
                  style={{ color: "var(--text3)" }}
                  onMouseEnter={(e: MouseEvent<HTMLElement>) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--text1)")
                  }
                  onMouseLeave={(e: MouseEvent<HTMLElement>) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--text3)")
                  }
                >
                  {id === "projects"
                    ? "Work"
                    : id.charAt(0).toUpperCase() + id.slice(1)}
                </Link>
              ))}
            </div>
            <div className="flex gap-2 justify-center flex-wrap">
              {socials.map((s: Social) => (
                <SocialIcon key={s.name} s={s} />
              ))}
            </div>
          </div>
          <div
            className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p className="text-xs" style={{ color: "var(--text3)" }}>
              © {new Date().getFullYear()}{" "}
              <span style={{ color: "var(--accent-h)" }}>{personal.name}</span>.
              All rights reserved.
            </p>
            <p className="text-xs" style={{ color: "var(--text3)" }}>
              @tripathidevlab · Learn · Build · Grow
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
