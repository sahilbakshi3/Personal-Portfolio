// src/components/Sections/Skills/Skills.jsx
import React from "react";
import { useReveal } from "../../Hooks/useReveal";
import { skills as skillsByCategory } from "../../Data/Skills";

const SectionLabel = ({ index, children }) => (
  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink3 mb-20 flex items-center gap-3">
    <span>{index} —</span>
    <span>{children}</span>
  </p>
);

const Skills = () => {
  const [ref, visible] = useReveal();

  return (
    <section
      id="skills"
      className="px-16 py-32 border-b border-black/10 bg-paper2"
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="03">Skills</SectionLabel>

        <h2
          className="font-display font-light text-ink mb-16 leading-[0.95]"
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
              className="p-14 md:border-r border-black/10 last:border-r-0 border-b md:border-b-0 last:border-b-0"
              style={{ transitionDelay: `${ci * 80}ms` }}
            >
              {/* Category label */}
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink3 mb-10 pb-5 border-b border-black/10">
                {cat.category}
              </p>

              {/* Skill list */}
              <ul className="flex flex-col">
                {cat.items.map((skill, si) => (
                  <li
                    key={skill.name}
                    className="
                      font-display font-light text-[22px] text-ink
                      py-4 border-b border-black/10 last:border-b-0
                      flex items-center justify-between
                      group cursor-default
                      transition-colors duration-200 hover:text-ink3
                    "
                    style={{ transitionDelay: `${(ci * 6 + si) * 30}ms` }}
                  >
                    {skill.name}
                    <span
                      className="
                      text-xs text-ink3 font-body
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
      </div>
    </section>
  );
};

export default Skills;
