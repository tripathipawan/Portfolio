import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { skillCategories } from "../../data/index";

// ── Types
interface SkillCategory {
  cat: string;
  icon: string;
  color: string;
  skills: string[];
}

// ── Framer variants

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 22 },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    y: -8,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

// ── Tab Button

function TabBtn({
  cat,
  active,
  onClick,
}: {
  cat: SkillCategory;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0 outline-none focus-visible:ring-2"
      style={{
        background: active ? `${cat.color}18` : "transparent",
        border: `1px solid ${active ? cat.color + "55" : "var(--border)"}`,
        color: active ? cat.color : "var(--text2)",
        boxShadow: active ? `0 0 16px ${cat.color}20` : "none",
      }}
    >
      <span className="text-base leading-none">{cat.icon}</span>
      <span className="hidden sm:inline">{cat.cat}</span>

      {/* Active sliding dot indicator */}
      {active && (
        <motion.span
          layoutId="tab-indicator"
          className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: cat.color }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

// ── Skill Pill

function SkillPill({ skill, color }: { skill: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={skillVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-4 py-3 rounded-xl cursor-default select-none transition-all duration-200"
      style={{
        background: hovered ? `${color}15` : "var(--bg3)",
        border: `1px solid ${hovered ? color + "45" : "var(--border)"}`,
        boxShadow: hovered ? `0 4px 20px ${color}20` : "none",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
        style={{
          background: color,
          boxShadow: hovered ? `0 0 6px ${color}` : "none",
        }}
      />
      <span
        className="text-xs font-semibold transition-colors duration-200"
        style={{ color: hovered ? "var(--text1)" : "var(--text2)" }}
      >
        {skill}
      </span>
    </motion.div>
  );
}

// ── Section Header

function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-12">
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
        Technical Skills
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]"
          style={{ fontFamily: "var(--font)" }}
        >
          What I <span className="g-text">Work With</span>
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-4 text-sm leading-relaxed max-w-lg"
        style={{ color: "var(--text2)" }}
      >
        A comprehensive toolkit built through hands-on projects, continuous
        learning, and real-world problem solving.
      </motion.p>
    </div>
  );
}

// ── Main Component

export default function Skills() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];

  const panelRef = useRef(null);
  const inView = useInView(panelRef, { once: true, margin: "-60px" });

  const totalSkills = skillCategories.reduce((a, c) => a + c.skills.length, 0);

  return (
    <section
      id="skills"
      className="relative overflow-hidden"
      style={{ background: "var(--bg1)" }}
    >
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

        {/* ── Tab Row */}
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Scrollable tabs on mobile */}
          <div className="relative mb-2">
            <div
              className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              {skillCategories.map((c, i) => (
                <TabBtn
                  key={c.cat}
                  cat={c}
                  active={active === i}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            {/* Bottom divider */}
            <div
              className="h-px w-full"
              style={{ background: "var(--border)" }}
            />
          </div>

          {/* ── Panel */}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 rounded-2xl overflow-hidden"
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Panel header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.7, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 360, damping: 20 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: `${cat.color}15`,
                    border: `1px solid ${cat.color}35`,
                    boxShadow: `0 0 20px ${cat.color}20`,
                  }}
                >
                  {cat.icon}
                </motion.div>

                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                  <motion.h3
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="text-base font-bold mb-1"
                    style={{ color: cat.color, fontFamily: "var(--font)" }}
                  >
                    {cat.cat}
                  </motion.h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${cat.color}15`,
                        border: `1px solid ${cat.color}35`,
                        color: cat.color,
                      }}
                    >
                      {cat.skills.length} skills
                    </span>
                    <span className="text-xs" style={{ color: "var(--text2)" }}>
                      Click any skill to highlight
                    </span>
                  </div>
                </div>

                {/* Progress bar — category index */}
                <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                  <span
                    className="text-[10px] font-bold tabular-nums"
                    style={{ color: "var(--text2)" }}
                  >
                    {active + 1} / {skillCategories.length}
                  </span>
                  <div className="flex gap-1" aria-hidden>
                    {skillCategories.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className="h-1 rounded-full transition-all duration-300 outline-none"
                        style={{
                          width: i === active ? 20 : 6,
                          background:
                            i === active ? cat.color : "var(--border-h)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills grid */}
              <div className="p-5">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5"
                >
                  <AnimatePresence>
                    {cat.skills.map((skill) => (
                      <SkillPill key={skill} skill={skill} color={cat.color} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 grid grid-cols-3 gap-3"
          >
            {[
              { label: "Total Skills", value: `${totalSkills}+` },
              { label: "Categories", value: `${skillCategories.length}` },
              { label: "Years Learning", value: "3+" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-4 px-2 rounded-2xl"
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
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
        </motion.div>
      </div>
    </section>
  );
}
