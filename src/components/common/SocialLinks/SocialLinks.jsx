// src/components/common/SocialLinks/SocialLinks.jsx
import React from 'react';
import { personalInfo } from '../../Data/PersonalInfo';
import { useReveal } from '../../Hooks/useReveal';

const SocialLinks = () => {
  const [ref, visible] = useReveal();

  return (
    <>
      {/* ── Contact section ── */}
      <section id="contact" className="px-8 md:px-16 py-32 bg-ink">
        <div
          ref={ref}
          className={`
            max-w-7xl mx-auto
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          {/* Section label on dark bg */}
          <div className="flex items-center gap-4 mb-20">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent">05</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/30">— Contact</span>
            <div className="flex-1 h-px bg-gradient-to-r from-accent/40 to-transparent" />
          </div>

          <h2
            className="font-display font-light text-paper mb-6 leading-[0.88]"
            style={{ fontSize: 'clamp(56px, 9vw, 120px)' }}
          >
            Let's build<br />
            <em className="text-accent/80">something</em>
          </h2>

          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/30 mb-10 ml-1">
            Drop me a line
          </p>

          <a
            href={`mailto:${personalInfo.email}`}
            className="
              underline-grow
              font-display font-light text-paper
              border-b border-white/20
              pb-1 hover:border-accent hover:text-accent
              transition-all duration-300 inline-block
            "
            style={{ fontSize: 'clamp(18px, 3vw, 36px)' }}
          >
            {personalInfo.email}
          </a>

          {/* Social links row */}
          <div className="flex gap-8 mt-20 pt-12 border-t border-white/10">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/40 hover:text-accent transition-colors duration-200 flex items-center gap-2"
            >
              <span className="w-4 h-px bg-current" />
              GitHub
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/40 hover:text-accent transition-colors duration-200 flex items-center gap-2"
            >
              <span className="w-4 h-px bg-current" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer bar ── */}
      <footer className="px-8 md:px-16 py-6 bg-ink border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.14em] text-white/25">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-white/20">
          Designed &amp; built with intention.
        </span>
      </footer>
    </>
  );
};

export default SocialLinks;