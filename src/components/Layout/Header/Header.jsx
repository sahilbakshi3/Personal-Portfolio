// src/components/Layout/Header/Header.jsx
import React, { useState, useEffect, useMemo } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const pos = window.scrollY + 140;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= pos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [navItems]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      setActiveSection(id);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-8 md:px-16 h-16
          transition-all duration-500
          ${scrolled ? "bg-paper/95 backdrop-blur-md border-b border-black/8 shadow-sm" : "bg-transparent"}
        `}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink hover:text-accent transition-colors duration-300"
        >
          SB
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 group"
            >
              <span
                className={
                  activeSection === item.id
                    ? "text-ink"
                    : "text-ink3 group-hover:text-ink"
                }
              >
                {item.label}
              </span>
              {/* active gold dot */}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden font-mono text-[11px] tracking-[0.14em] uppercase text-ink3 hover:text-ink transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`
          fixed inset-0 z-40 bg-paper flex flex-col justify-center items-center gap-10 md:hidden
          transition-all duration-500
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* decorative gold line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-accent/20" />
        {navItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="font-display font-light text-5xl text-ink hover:text-accent transition-colors duration-200 relative z-10"
            style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Header;
