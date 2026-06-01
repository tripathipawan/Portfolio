/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { services } from "../../data/index";

// ── Types
interface Service {
  id: number;
  icon: string;
  title: string;
  shortDesc: string;
  desc: string;
  color: string;
  tags: string[];
  available: boolean;
}

// ── Framer variants

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const heroVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const miniVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  },
};

// ── Section Header
function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-14">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase mb-4"
        style={{ color: "var(--accent-h)" }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        What I Offer
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]"
          style={{ fontFamily: "var(--font)", color: "var(--text1)" }}
        >
          My <span className="g-text">Services</span>
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-4 text-sm leading-relaxed max-w-lg"
        style={{ color: "var(--text2)" }}
      >
        From pixel-perfect UIs to AI-powered web apps — I build digital
        experiences that stand out and perform.
      </motion.p>
    </div>
  );
}

function HeroCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={heroVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden col-span-1 md:col-span-2"
      style={{
        background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
        border: `1px solid ${hovered ? service.color + "55" : "var(--border)"}`,
        boxShadow: "var(--neu-out)",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${service.color}, ${service.color}44)`,
        }}
      />

      {/* Background glow */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: service.color }}
        animate={{ opacity: hovered ? 0.1 : 0.05 }}
        transition={{ duration: 0.4 }}
        aria-hidden
      />
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: service.color,
          filter: "blur(60px)",
          opacity: hovered ? 0.12 : 0.06,
          transition: "opacity 0.4s",
        }}
        aria-hidden
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-8 relative z-10">
        {/* Big number */}
        <div
          className="hidden sm:flex text-[80px] font-black leading-none select-none flex-shrink-0"
          style={{
            fontFamily: "var(--mono)",
            color: service.color,
            opacity: 0.08,
          }}
          aria-hidden
        >
          01
        </div>

        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            background: `${service.color}18`,
            border: `1px solid ${service.color}35`,
            boxShadow: hovered ? `0 0 24px ${service.color}30` : "none",
          }}
        >
          {service.icon}
        </motion.div>

        <div className="flex-1 min-w-0">
          {/* Tag */}
          <div
            className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2"
            style={{ color: service.color }}
          >
            Primary Service
          </div>

          {/* Title */}
          <h3
            className="text-xl sm:text-2xl font-black mb-2 leading-tight"
            style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
          >
            {service.title}
          </h3>

          {/* Desc */}
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "var(--text2)" }}
          >
            {service.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: `${service.color}12`,
                  border: `1px solid ${service.color}30`,
                  color: service.color,
                }}
              >
                {tag}
              </span>
            ))}
            {service.available && (
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ml-auto"
                style={{
                  background: "rgba(16, 217, 160, 0.1)",
                  border: "1px solid rgba(16, 217, 160, 0.3)",
                  color: "var(--green)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--green)",
                    animation: "blink 2s ease infinite",
                  }}
                />
                Available
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Mini Card

function MiniCard({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={miniVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-5 overflow-hidden flex flex-col gap-3"
      style={{
        background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
        border: `1px solid ${hovered ? service.color + "55" : "var(--border)"}`,
        boxShadow: "var(--neu-out-sm)",
        transition: "border-color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `${service.color}`, opacity: 0.7 }}
      />

      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
        style={{
          background: service.color,
          filter: "blur(32px)",
          opacity: hovered ? 0.1 : 0.04,
          transition: "opacity 0.35s",
        }}
        aria-hidden
      />

      {/* Number watermark */}
      <div
        className="absolute bottom-3 right-4 font-black select-none pointer-events-none"
        style={{
          fontFamily: "var(--mono)",
          fontSize: "2.2rem",
          lineHeight: 1,
          color: service.color,
          opacity: 0.06,
        }}
        aria-hidden
      >
        {String(index + 2).padStart(2, "0")}
      </div>

      {/* Icon */}
      <motion.div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 relative z-10"
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        style={{
          background: `${service.color}15`,
          border: `1px solid ${service.color}30`,
        }}
      >
        {service.icon}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex-1">
        <div
          className="w-8 h-[2px] rounded-full mb-2"
          style={{ background: service.color }}
        />
        <h3
          className="text-sm font-bold mb-1"
          style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
        >
          {service.title}
        </h3>
        <p
          className="text-[11px] leading-[1.6]"
          style={{ color: "var(--text2)" }}
        >
          {service.desc}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 relative z-10">
        {service.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: `${service.color}10`,
              border: `1px solid ${service.color}25`,
              color: service.color,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Bottom Stats Row

function StatsRow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    { label: "Services", value: `${services.length}` },
    { label: "Projects Delivered", value: "75+" },
    { label: "Open to Work", value: "Yes ✓" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-6 grid grid-cols-3 gap-3"
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center py-4 px-2 rounded-2xl"
          style={{
            background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
            border: "1px solid var(--border)",
            boxShadow: "var(--neu-out-sm)",
          }}
        >
          <span
            className="text-xl sm:text-2xl font-black g-text"
            style={{ fontFamily: "var(--font)" }}
          >
            {s.value}
          </span>
          <span
            className="text-[10px] sm:text-xs font-medium mt-1 text-center"
            style={{ color: "var(--text2)" }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

// ── Main Component

export default function Services() {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-60px" });

  const [heroService] = services;
  const miniServices = services.slice(1);

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{ background: "var(--bg0)" }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="section-wrap relative z-10">
        <SectionHeader />

        {/* ── Bento Grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Hero card — full width */}
          <HeroCard service={heroService} />

          {/* Mini cards */}
          <AnimatePresence>
            {miniServices.map((service, i) => (
              <MiniCard key={service.id} service={service} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <StatsRow />
      </div>
    </section>
  );
}
