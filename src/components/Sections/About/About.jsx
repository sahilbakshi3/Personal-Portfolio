// src/components/Sections/About/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { useReveal } from "../../Hooks/useReveal";
import { personalInfo } from "../../Data/PersonalInfo";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  },
});

const SectionLabel = ({ index, children }) => (
  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink3 mb-20 flex items-center gap-3">
    <span>{index} —</span>
    <span>{children}</span>
  </p>
);

const About = () => {
  const [bioRef, bioVisible] = useReveal();
  const [tlRef, tlVisible] = useReveal();

  const stats = [
    { value: "6+", label: "Projects" },
    { value: "1+", label: "Years Exp." },
    { value: "15+", label: "Technologies" },
  ];

  return (
    <section
      id="about"
      className="px-16 py-32 border-b border-black/10 bg-paper"
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="01">About</SectionLabel>

        {/* ── Bio + Meta grid ── */}
        <div
          ref={bioRef}
          className={`
            grid grid-cols-1 lg:grid-cols-2 border border-black/10
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${bioVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {/* Bio */}
          <div className="p-16 lg:border-r border-black/10">
            <p className="font-display text-2xl font-light italic text-ink leading-relaxed mb-6">
              An aspiring Software Developer with a passion for building things
              that matter.
            </p>
            <p className="text-[15px] font-light text-ink2 leading-[1.85] mb-4">
              Pursuing Electronics &amp; Instrumentation Engineering while
              crafting intuitive web experiences. I believe good software is
              invisible — it just works, beautifully.
            </p>
            <p className="text-[15px] font-light text-ink2 leading-[1.85]">
              Beyond the screen: Formula 1 enthusiast, food explorer, and
              relentless traveller. Always chasing the next interesting problem
              to solve.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 border-t border-black/10 mt-12">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="pt-10 pr-6 border-r border-black/10 last:border-r-0"
                >
                  <span className="font-display font-light text-5xl text-ink leading-none block mb-2">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink3">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-col divide-y divide-black/10">
            {[
              { label: "Location", value: "Indore, India" },
              {
                label: "Education",
                value: "B.E. Electronics & Instrumentation\nSGSITS, Indore",
              },
              {
                label: "Current Role",
                value: "Software Developer\nQuantiphi Technologies",
              },
              { label: "Availability", value: "Open to opportunities" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2 px-12 py-9">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink3">
                  {label}
                </span>
                <span className="text-[15px] text-ink font-light whitespace-pre-line leading-relaxed">
                  {value}
                </span>
              </div>
            ))}
            {/* Resume */}
            <div className="flex flex-col gap-2 px-12 py-9">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink3">
                Resume
              </span>
              <a
                href="/RESUME.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-ink border-b border-ink pb-0.5 w-fit hover:opacity-50 transition-opacity duration-200"
              >
                Download PDF ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── Journey / Timeline ── */}
        <div className="mt-32">
          <SectionLabel index="02">Journey</SectionLabel>

          <h2
            className="font-display font-light text-ink mb-16 leading-[0.95]"
            style={{ fontSize: "clamp(48px, 7vw, 88px)" }}
          >
            Where I've
            <br />
            <em>been</em>
          </h2>

          <div
            ref={tlRef}
            className="flex flex-col border border-black/10 overflow-hidden"
          >
            {[
              {
                period: "Sep 2020 – May 2024",
                type: "Education",
                title: "Bachelor of Engineering",
                org: "Shri G.S. Institute of Technology & Science · Indore",
                desc: "Electronics and Instrumentation Engineering. Built a strong foundation in systems thinking, hardware-software integration, and problem-solving under constraints.",
                tags: [],
              },
              {
                period: "Feb 2024 – Aug 2024",
                type: "Internship",
                title: "Frontend Developer Intern",
                org: "Quantiphi Technologies Solutions Pvt. Ltd.",
                desc: "Developed responsive web applications using React and contributed to UI/UX improvements across the product suite.",
                tags: ["React", "JavaScript", "CSS3", "Git"],
              },
              {
                period: "Aug 2024 – Jun 2025",
                type: "Full-time",
                title: "Software Developer",
                org: "Quantiphi Technologies Solutions Pvt. Ltd.",
                desc: "Enhanced Dociphi — a GenAI-based document processing SaaS. Contributed to a 3% reduction in operational costs through automation.",
                tags: ["React", "Python", "JavaScript", "GenAI", "Git"],
              },
            ].map((entry, i) => (
              <div
                key={i}
                className={`
                  grid grid-cols-1 md:grid-cols-[200px_1px_1fr]
                  border-b border-black/10 last:border-b-0
                  transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${
                    tlVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }
                `}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Date */}
                <div className="px-10 pt-12 pb-4 md:pb-12">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink3 block mb-2">
                    Period
                  </span>
                  <span className="font-display font-light text-xl text-ink2 leading-snug">
                    {entry.period.split("–").join("–\n")}
                  </span>
                </div>

                {/* Divider */}
                <div className="hidden md:block bg-black/10" />

                {/* Content */}
                <div className="px-10 md:px-16 pb-12 pt-4 md:pt-12">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink3 mb-4">
                    {entry.type}
                  </p>
                  <h3 className="font-display font-light text-[32px] text-ink leading-tight mb-1">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-ink3 mb-5 font-light">
                    {entry.org}
                  </p>
                  <p className="text-[15px] text-ink2 font-light leading-[1.8] max-w-xl">
                    {entry.desc}
                  </p>
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink3 border border-black/15 px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
