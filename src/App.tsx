import { Suspense, lazy } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useScrollProgress } from "./hooks/index";
import MarqueeBar from "./components/ui/MarqueeBar";
import Navbar from "./components/layout/Navbar";
import { ScrollToTop } from "./components/layout/Footer";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";

// ── Lazy load all below-the-fold sections (reduces initial JS parse time) ──
const About = lazy(() => import("./components/sections/About"));
const Services = lazy(() => import("./components/sections/Services"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Edu_Exp = lazy(() => import("./components/sections/Journey"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Contact = lazy(() => import("./components/sections/Contact"));

// ── Lightweight skeleton — avoids layout shift during lazy load ──
function Skeleton() {
  return (
    <div className="section-wrap" aria-hidden="true">
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 rounded-xl animate-pulse"
            style={{
              background: "var(--bg3)",
              width: i === 1 ? "35%" : i === 2 ? "65%" : "85%",
            }}
          />
        ))}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-44 rounded-2xl animate-pulse"
              style={{ background: "var(--bg3)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Scroll progress bar at top ──
function ProgressBar() {
  const p = useScrollProgress();
  return (
    <div
      className="fixed top-0 left-0 z-[300] h-[3px] rounded-r-full"
      aria-hidden="true"
      role="presentation"
      style={{
        width: `${p * 100}%`,
        background:
          "linear-gradient(90deg,var(--accent),var(--accent-h),var(--green))",
        boxShadow: "0 0 10px var(--accent-glow)",
        transition: "width 0.1s linear",
      }}
    />
  );
}

function Inner() {
  return (
    <>
      <ProgressBar />
      <Navbar />
      {/* ── a11y: skip to main content link ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-[400] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:font-bold"
        style={{ background: "var(--accent)" }}
      >
        Skip to main content
      </a>

      <main id="main-content">
        <Hero />
        <MarqueeBar />

        <Suspense fallback={<Skeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<Skeleton />}>
          <Services />
        </Suspense>
        <Suspense fallback={<Skeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<Skeleton />}>
          <Edu_Exp />
        </Suspense>
        <Suspense fallback={<Skeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<Skeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  );
}
