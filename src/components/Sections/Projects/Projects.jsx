// src/components/Sections/Projects/Projects.jsx
import React, { useState } from "react";
import { useReveal } from "../../Hooks/useReveal";
import { projects } from "../../Data/Projects";
import ProjectModal from "./ProjectModal";

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

const Projects = () => {
  const [ref, visible] = useReveal();
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModal] = useState(false);

  const open = (p) => {
    setSelected(p);
    setModal(true);
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    setModal(false);
    document.body.style.overflow = "";
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <section
      id="projects"
      className="px-8 md:px-16 py-32 border-b border-black/10 bg-paper"
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel index="04">Projects</SectionLabel>

        <h2
          className="font-display font-light text-ink mb-16 leading-[0.92]"
          style={{ fontSize: "clamp(48px, 7vw, 88px)" }}
        >
          Selected
          <br />
          <em>work</em>
        </h2>

        <div ref={ref} className="flex flex-col border border-black/10">
          {projects.map((project, i) => (
            <div
              key={project.id}
              onClick={() => open(project)}
              className={`
                group relative grid grid-cols-1 sm:grid-cols-[64px_1fr_auto]
                items-center border-b border-black/10 last:border-b-0
                cursor-pointer overflow-hidden
                transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
              `}
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              {/* Hover accent fill */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Left accent bar on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

              {/* Index */}
              <span className="font-mono text-[11px] text-ink3 tracking-[0.1em] p-7 pb-0 sm:pb-7 self-start sm:self-center group-hover:text-accent transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Info */}
              <div className="px-7 sm:px-8 py-7">
                <h3 className="font-display font-light text-[28px] text-ink mb-1 leading-tight group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-ink3 font-light max-w-md leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink3 bg-black/[0.04] px-2.5 py-1 group-hover:border-accent/30 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="font-mono text-[10px] text-ink3">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Links */}
              <div
                className="flex gap-2 p-7 self-center"
                onClick={(e) => e.stopPropagation()}
              >
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink3 border border-black/15 px-4 py-2.5 hover:border-accent hover:text-accent transition-all duration-200 whitespace-nowrap"
                  >
                    Live ↗
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink3 border border-black/15 px-4 py-2.5 hover:border-accent hover:text-accent transition-all duration-200 whitespace-nowrap"
                  >
                    Code ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink3 mt-6 text-center opacity-60">
          Click any row to explore details
        </p>
      </div>

      <ProjectModal project={selected} isOpen={modalOpen} onClose={close} />
    </section>
  );
};

export default Projects;
