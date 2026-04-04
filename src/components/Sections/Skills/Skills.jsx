// src/components/Sections/Skills/Skills.jsx
import React from "react";
import { useReveal } from "../../Hooks/useReveal";
import { skills as skillsByCategory } from "../../Data/Skills";

const SectionLabel = ({ index, children }) => (
  <div className="flex items-center gap-4 mb-20">
    <span className="text-shimmer font-mono text-[11px] tracking-[0.2em] uppercase">
      {index}
    </span>
    <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink3">
      — {children}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
  </div>
);

const Skills = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      id="skills"
      className="px-8 md:px-16 py-32 border-b border-black/10 bg-paper2"
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="03">Skills</SectionLabel>

        <h2
          className="font-display font-light text-ink mb-16 leading-[0.92]"
          style={{ fontSize: "clamp(48px, 7vw, 88px)" }}
        >
          What I<br />
          <em>work with</em>
        </h2>

        <div
          ref={ref}
          className={`
            grid grid-cols-1 md:grid-cols-3 border border-black/10
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {skillsByCategory.map((cat, ci) => (
            <div
              key={cat.category}
              className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-black/10 last:border-r-0 last:border-b-0"
            >
              {/* Category header with accent dot */}
              <div className="flex items-center gap-2 mb-10 pb-5 border-b border-black/10">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink3">
                  {cat.category}
                </p>
              </div>

              <ul className="flex flex-col">
                {cat.items.map((skill, si) => (
                  <li
                    key={skill.name}
                    className="
                      group font-display font-light text-[22px] text-ink
                      py-4 border-b border-black/10 last:border-b-0
                      flex items-center justify-between
                      cursor-default
                      hover:text-accent
                      transition-colors duration-200
                    "
                    style={{
                      transitionDelay: visible
                        ? `${(ci * 6 + si) * 25}ms`
                        : "0ms",
                    }}
                  >
                    {skill.name}
                    <span
                      className="
                      font-body text-xs text-ink3
                      opacity-0 -translate-x-1
                      group-hover:opacity-100 group-hover:translate-x-0
                      transition-all duration-200
                    "
                    >
                      ↗
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom accent strip */}
        <div className="h-px mt-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>
    </section>
  );
};

export default Skills;
