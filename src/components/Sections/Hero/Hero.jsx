// src/components/Sections/Hero/Hero.jsx
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef(null);

  const roles = useMemo(
    () => [
      "Web Developer",
      "UI/UX Designer",
      "React Specialist",
      "Problem Solver",
    ],
    [],
  );

  useEffect(() => {
    const word = roles[roleIndex];
    if (!deleting) {
      if (charIndex < word.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(word.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 90);
      } else {
        timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(word.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 55);
      } else {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, deleting, roleIndex, roles]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14 } },
  };
  const item = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 overflow-hidden bg-paper"
    >
      {/* ── Background texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* ── Large decorative number ── */}
      <div
        className="absolute top-24 right-8 md:right-16 font-display font-light leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(160px, 28vw, 400px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(10,10,10,0.06)",
        }}
      >
        01
      </div>

      {/* ── Gold accent line top ── */}
      <div className="absolute top-0 left-8 md:left-16 w-px h-32 bg-gradient-to-b from-transparent via-accent to-transparent opacity-60" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink3 mb-10 flex items-center gap-4"
        >
          <span className="block w-10 h-px bg-accent opacity-70" />
          Full Stack Developer &amp; Designer — Indore, India
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display font-light leading-[0.88] tracking-tight text-ink"
          style={{ fontSize: "clamp(72px, 11vw, 152px)" }}
        >
          Sahil
          <br />
          <em>Bakshi</em>
        </motion.h1>

        {/* Bottom row */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mt-12 pt-8 border-t border-black/10 gap-6"
        >
          {/* Typewriter */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink3 mb-2">
              Currently
            </p>
            <p className="font-mono text-base text-ink">
              {displayText}
              <span className="animate-blink text-accent">_</span>
            </p>
          </div>

          {/* CTA — styled with accent border */}
          <button
            onClick={() => scrollTo("projects")}
            className="
              group flex items-center gap-4
              font-mono text-[11px] tracking-[0.16em] uppercase
              border border-black/20 hover:border-accent
              px-7 py-4
              text-ink3 hover:text-ink
              transition-all duration-300
            "
          >
            View Work
            <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
          </button>
        </motion.div>
      </motion.div>

      {/* ── Bottom border with gold fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </section>
  );
};

export default Hero;
