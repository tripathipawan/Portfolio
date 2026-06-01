"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects as projectsData } from "../../data/index";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_DISPLAY: Record<
  number,
  {
    num: string;
    pattern: string;
    accent: string;
    accentDim: string;
    accentDimLight: string;
  }
> = {
  1: {
    num: "01",
    pattern: "grid",
    accent: "#38bdf8",
    accentDim: "rgba(56,189,248,0.12)",
    accentDimLight: "rgba(56,189,248,0.08)",
  },
  2: {
    num: "02",
    pattern: "lines",
    accent: "#d97706",
    accentDim: "rgba(217,119,6,0.08)",
    accentDimLight: "rgba(217,119,6,0.06)",
  },
  3: {
    num: "03",
    pattern: "circles",
    accent: "#7510ff",
    accentDim: "rgba(117,16,255,0.12)",
    accentDimLight: "rgba(117,16,255,0.07)",
  },
  4: {
    num: "04",
    pattern: "mesh",
    accent: "#e11d48",
    accentDim: "rgba(225,29,72,0.12)",
    accentDimLight: "rgba(225,29,72,0.07)",
  },
  6: {
    num: "05",
    pattern: "grid",
    accent: "#d97706",
    accentDim: "rgba(217,119,6,0.12)",
    accentDimLight: "rgba(217,119,6,0.07)",
  },
};

const displayProjects = projectsData.slice(0, 4);

function PatternBg({ pattern, accent }: { pattern: string; accent: string }) {
  const opacity = 0.35;
  if (pattern === "grid") {
    return (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${accent}22 1px, transparent 1px), linear-gradient(90deg, ${accent}22 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity,
        }}
      />
    );
  }
  if (pattern === "lines") {
    return (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 18px, ${accent}18 19px)`,
          opacity,
        }}
      />
    );
  }
  if (pattern === "circles") {
    return (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${accent}28 1.5px, transparent 1.5px)`,
          backgroundSize: "22px 22px",
          opacity,
        }}
      />
    );
  }
  // mesh — pure CSS, no SVG
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(${accent}20 1px, transparent 1px), linear-gradient(90deg, ${accent}20 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        opacity,
      }}
    />
  );
}

function ProjectCard({
  project,
  display,
  total,
}: {
  project: (typeof projectsData)[0];
  display: {
    num: string;
    pattern: string;
    accent: string;
    accentDim: string;
    accentDimLight: string;
  };
  total: number;
}) {
  const hasImage = Boolean(project.image);

  return (
    <div
      className="relative flex-shrink-0 w-full min-[426px]:w-[400px] lg:w-[440px] rounded-2xl overflow-hidden group"
      style={{
        height: "clamp(440px, 56vh, 580px)",
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}
    >
      {/* Pattern background — only show if no image */}
      {!hasImage && (
        <PatternBg pattern={display.pattern} accent={display.accent} />
      )}

      {/* Accent glow top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${display.accent}80, transparent)`,
        }}
      />

      {/* Image area — top 45% */}
      {hasImage ? (
        <>
          <div
            className="relative w-full overflow-hidden"
            style={{ height: "52%" }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* number badge over image */}
            <div className="absolute top-3 left-4">
              <span
                className="font-mono text-[10px] tracking-widest px-2 py-1 rounded-full"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(6px)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {display.num}/{String(total).padStart(2, "0")}
              </span>
            </div>
            {/* tech badge over image */}
            <div className="absolute top-3 right-4">
              <span
                className="font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-full border"
                style={{
                  borderColor: `${display.accent}70`,
                  color: display.accent,
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {project.tech[0]}
              </span>
            </div>
          </div>
          {/* Separator */}
          <div
            className="w-full h-px"
            style={{
              background: `linear-gradient(90deg, ${display.accent}60, var(--border), ${display.accent}20)`,
            }}
          />
        </>
      ) : (
        /* No image — pattern top area with badges */
        <div className="relative" style={{ height: "45%" }}>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${display.accentDimLight}, var(--bg2))`,
              opacity: 0.9,
            }}
          />
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
            <span
              className="font-mono text-[10px] tracking-widest"
              style={{ color: "var(--text2)" }}
            >
              {display.num}/{String(total).padStart(2, "0")}
            </span>
            <span
              className="font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-full border"
              style={{
                borderColor: `${display.accent}60`,
                color: display.accent,
              }}
            >
              {project.tech[0]}
            </span>
          </div>
        </div>
      )}

      {/* Bottom content */}
      <div
        className="p-5 flex flex-col justify-between"
        style={{ height: "48%" }}
      >
        <div>
          {/* Title */}
          <h3
            className="font-bold leading-tight mb-2"
            style={{
              color: "var(--text1)",
              fontFamily: "var(--font)",
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            }}
          >
            {project.title}
          </h3>

          {/* Accent line */}
          <div
            className="w-8 h-0.5 rounded-full mb-3"
            style={{ background: display.accent }}
          />

          {/* Desc */}
          <p
            className="text-xs leading-relaxed line-clamp-3"
            style={{ color: "var(--text2)" }}
          >
            {project.desc}
          </p>
        </div>

        <div>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-medium px-2.5 py-0.5 rounded-full"
                style={{
                  background: `${display.accent}14`,
                  border: `1px solid ${display.accent}30`,
                  color: display.accent,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 group/live"
            >
              <div
                className="w-5 h-px transition-all duration-300 group-hover/live:w-8"
                style={{ background: display.accent }}
              />
              <span
                className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-1 transition-opacity duration-200 group-hover/live:opacity-80"
                style={{ color: display.accent }}
              >
                Live project <FaExternalLinkAlt size={9} />
              </span>
            </a>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text2)",
                  background: "rgba(255,255,255,0.03)",
                  fontSize: "10px",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.05em",
                }}
              >
                <FaGithub size={12} />
                Source
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${display.accent}12, transparent 65%)`,
        }}
      />
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    const wrap = wrapRef.current;
    if (!section || !rail || !wrap) return;

    const getScrollAmount = () => -(rail.scrollWidth - window.innerWidth + 96);

    // GSAP matchMedia — desktop only (≥768px), mobile untouched
    const mm = gsap.matchMedia();

    mm.add("(min-width: 426px)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${rail.scrollWidth - window.innerWidth + 96}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(rail, { x: () => getScrollAmount(), ease: "none" });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const total = displayProjects.length;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative md:overflow-hidden"
      style={{ background: "var(--bg1)" }}
    >
      <div
        className="hidden min-[426px]:flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        {/* Section heading */}
        <div
          className="pt-25 pb-2"
          style={{
            maxWidth: "1180px",
            width: "100%",
            margin: "0 auto",
            paddingLeft: "clamp(16px, 2.75vw, 32px)",
            paddingRight: "clamp(16px, 2.75vw, 32px)",
          }}
        >
          <div
            className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-4"
            style={{ color: "var(--accent-h)" }}
          >
            <span
              className="inline-block w-7 h-0.5 rounded-full"
              style={{ background: "var(--accent-h)" }}
            />
            Selected Work
          </div>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <h2
              className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]"
              style={{ fontFamily: "var(--font)", color: "var(--text1)" }}
            >
              Things I&apos;ve <span className="g-text">built</span>.
            </h2>
            <p
              className="text-sm leading-[1.85] max-w-xs"
              style={{ color: "var(--text2)" }}
            >
              Live projects — shipped and running in the wild.
            </p>
          </div>
        </div>

        {/* Cards rail */}
        <div ref={wrapRef} className="flex-1 flex items-center overflow-hidden">
          <div
            ref={railRef}
            className="flex flex-row flex-nowrap items-center gap-5 py-4"
            style={{
              paddingLeft: "180px",
              paddingRight: "200px",
              willChange: "transform",
            }}
          >
            {displayProjects.map((p, i) => {
              const display = PROJECT_DISPLAY[p.id] ?? {
                num: String(i + 1).padStart(2, "0"),
                pattern: "grid",
                accent: "#6366f1",
                accentDim: "rgba(99,102,241,0.12)",
                accentDimLight: "rgba(99,102,241,0.07)",
              };
              return (
                <ProjectCard
                  key={p.id}
                  project={p}
                  display={display}
                  total={total}
                />
              );
            })}

            {/* More Projects CTA */}
            <a
              href="https://github.com/tripathipawan"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-shrink-0 w-[260px] h-[58vh] min-h-[440px] max-h-[580px] rounded-2xl overflow-hidden flex flex-col items-center justify-center hover:scale-[1.02] transition-transform duration-300"
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.08), transparent 70%)",
                }}
              />
              <div className="text-center p-8 relative z-10">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(129,140,248,0.1))",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}
                >
                  <FaGithub size={20} style={{ color: "var(--text2)" }} />
                </div>
                <p
                  className="font-bold text-2xl mb-1"
                  style={{ fontFamily: "var(--font)", color: "var(--text2)" }}
                >
                  More on
                </p>
                <p
                  className="font-bold text-2xl italic g-text mb-4"
                  style={{ fontFamily: "var(--font)" }}
                >
                  GitHub
                </p>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono tracking-wider border"
                  style={{
                    borderColor: "rgba(99,102,241,0.3)",
                    color: "var(--accent-h)",
                    background: "rgba(99,102,241,0.08)",
                  }}
                >
                  <FaGithub size={13} />
                  65+ Repositories
                </div>
                <p
                  className="font-mono text-[10px] tracking-widest mt-4 uppercase"
                  style={{ color: "var(--text3)" }}
                >
                  View all projects →
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col min-[426px]:hidden px-4 pt-16 pb-10">
        {/* Heading */}
        <div className="mb-8">
          <div
            className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-4"
            style={{ color: "var(--accent-h)" }}
          >
            <span
              className="inline-block w-7 h-0.5 rounded-full"
              style={{ background: "var(--accent-h)" }}
            />
            Selected Work
          </div>
          <h2
            className="font-black leading-tight tracking-tight text-[clamp(2rem,8vw,3rem)] mb-2"
            style={{ fontFamily: "var(--font)", color: "var(--text1)" }}
          >
            Things I&apos;ve <span className="g-text italic">built</span>.
          </h2>
          <p
            className="text-sm leading-[1.85]"
            style={{ color: "var(--text2)" }}
          >
            Live projects — shipped and running in the wild.
          </p>
        </div>

        {/* Cards — vertical stack */}
        <div className="flex flex-col gap-4">
          {displayProjects.map((p, i) => {
            const display = PROJECT_DISPLAY[p.id] ?? {
              num: String(i + 1).padStart(2, "0"),
              pattern: "grid",
              accent: "#6366f1",
              accentDim: "rgba(99,102,241,0.12)",
              accentDimLight: "rgba(99,102,241,0.07)",
            };
            return (
              <ProjectCard
                key={p.id}
                project={p}
                display={display}
                total={total}
              />
            );
          })}

          <a
            href="https://github.com/tripathipawan"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center py-10 transition-transform duration-300 active:scale-[0.98]"
            style={{ border: "1px dashed var(--border)", minHeight: "160px" }}
          >
            <div className="text-center px-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(129,140,248,0.1))",
                  border: "1px solid rgba(99,102,241,0.3)",
                }}
              >
                <FaGithub size={18} style={{ color: "var(--text2)" }} />
              </div>
              <p
                className="font-bold text-xl mb-1"
                style={{ fontFamily: "var(--font)", color: "var(--text2)" }}
              >
                More on <span className="g-text italic">GitHub</span>
              </p>
              <div
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-[11px] font-mono tracking-wider border"
                style={{
                  borderColor: "rgba(99,102,241,0.3)",
                  color: "var(--accent-h)",
                  background: "rgba(99,102,241,0.08)",
                }}
              >
                <FaGithub size={12} />
                65+ Repositories
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
