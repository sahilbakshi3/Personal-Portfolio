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
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-end px-16 pb-20 border-b border-black/10 relative overflow-hidden bg-paper"
    >
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink3 mb-8 flex items-center gap-4"
        >
          <span className="block w-8 h-px bg-ink3" />
          Full Stack Developer &amp; Designer — Indore, India
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display font-light leading-[0.9] tracking-tight text-ink mb-0"
          style={{ fontSize: "clamp(72px, 11vw, 152px)" }}
        >
          Sahil
          <br />
          <em className="not-italic" style={{ fontStyle: "italic" }}>
            Bakshi
          </em>
        </motion.h1>

        {/* Divider row */}
        <motion.div
          variants={item}
          className="flex items-end justify-between mt-12 pt-8 border-t border-black/10 gap-8"
        >
          {/* Typewriter */}
          <p className="font-mono text-sm tracking-wide text-ink2">
            Currently —&nbsp;
            <span className="text-ink">{displayText}</span>
            <span className="animate-blink ml-0.5 text-ink font-light">_</span>
          </p>

          {/* CTA */}
          <button
            onClick={() => scrollTo("projects")}
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink3 hover:text-ink transition-colors duration-200 flex items-center gap-3 shrink-0"
          >
            View Work
            <span className="block w-8 h-px bg-current" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
