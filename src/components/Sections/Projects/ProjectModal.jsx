// src/components/Sections/Projects/ProjectModal.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const FADE_MS = 240;

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [exiting, setExiting] = useState(false);

  const requestClose = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      onClose?.();
    }, FADE_MS);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, requestClose]);

  if (!isOpen && !exiting) return null;
  if (!project) return null;

  const visible = isOpen && !exiting;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={requestClose}
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-[240ms] ${visible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel */}
      <div
        className={`
          fixed inset-0 z-50 flex items-center justify-center p-6
          transition-opacity duration-[240ms] pointer-events-none
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            relative bg-paper w-full max-w-3xl max-h-[88vh] overflow-y-auto
            border border-black/10 pointer-events-auto
            transition-transform duration-[240ms]
            ${visible ? "translate-y-0" : "translate-y-4"}
          `}
        >
          {/* Header image */}
          {project.image && (
            <div className="relative h-64 overflow-hidden bg-paper2">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h2 className="absolute bottom-0 left-0 p-8 font-display font-light text-4xl text-white leading-tight">
                {project.title}
              </h2>
            </div>
          )}

          {/* Close */}
          <button
            onClick={requestClose}
            className="absolute top-4 right-4 p-2 text-white hover:opacity-70 transition-opacity z-10"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Body */}
          <div className="p-10 flex flex-col gap-10">
            {/* Description */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink3 mb-4">
                About
              </p>
              <p className="text-[15px] text-ink2 font-light leading-[1.85]">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tags */}
            {project.tags?.length > 0 && (
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink3 mb-4">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink2 border border-black/15 px-3 py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features?.length > 0 && (
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink3 mb-4">
                  Key Features
                </p>
                <ul className="flex flex-col gap-0 border-t border-black/10">
                  {project.features.map((f, i) => (
                    <li
                      key={i}
                      className="text-[14px] text-ink2 font-light py-4 border-b border-black/10 flex items-start gap-3"
                    >
                      <span className="font-mono text-ink3 text-[10px] mt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-2 border-t border-black/10">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink border border-ink px-6 py-3.5 hover:bg-ink hover:text-paper transition-all duration-200"
                >
                  View Live ↗
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink3 border border-black/20 px-6 py-3.5 hover:border-ink hover:text-ink transition-all duration-200"
                >
                  Source Code ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
