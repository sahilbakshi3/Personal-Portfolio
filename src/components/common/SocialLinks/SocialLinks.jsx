// src/components/common/SocialLinks/SocialLinks.jsx
import React from "react";
import { personalInfo } from "../../Data/PersonalInfo";
import { useReveal } from "../../Hooks/useReveal";

const SocialLinks = () => {
  const [ref, visible] = useReveal();

  return (
    <>
      {/* ── Contact section ── */}
      <section
        id="contact"
        className="px-16 py-32 bg-paper2 border-b border-black/10"
      >
        <div
          ref={ref}
          className={`
            max-w-7xl mx-auto
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink3 mb-20 flex items-center gap-3">
            <span>05 —</span>
            <span>Contact</span>
          </p>

          <h2
            className="font-display font-light text-ink mb-12 leading-[0.9]"
            style={{ fontSize: "clamp(56px, 9vw, 120px)" }}
          >
            Let's build
            <br />
            <em>something</em>
          </h2>

          <a
            href={`mailto:${personalInfo.email}`}
            className="
              font-display font-light text-ink
              border-b border-ink pb-1
              hover:opacity-50 transition-opacity duration-200
              inline-block
            "
            style={{ fontSize: "clamp(20px, 3.5vw, 42px)" }}
          >
            {personalInfo.email}
          </a>
        </div>
      </section>

      {/* ── Footer bar ── */}
      <footer className="px-16 py-8 bg-paper2 flex items-center justify-between border-t border-black/10">
        <span className="font-mono text-[11px] tracking-[0.12em] text-ink3">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </span>
        <div className="flex gap-8">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink3 hover:text-ink transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink3 hover:text-ink transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink3 hover:text-ink transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </footer>
    </>
  );
};

export default SocialLinks;
