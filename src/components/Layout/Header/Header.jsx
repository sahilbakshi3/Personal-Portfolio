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
      {/* ── Desktop nav ── */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-16 py-7
          transition-all duration-500
          ${
            scrolled
              ? "bg-paper/90 backdrop-blur-md border-b border-black/8"
              : "bg-transparent"
          }
        `}
      >
        {/* Logo mark */}
        <button
          onClick={() => scrollTo("home")}
          className="font-mono text-xs tracking-[0.18em] uppercase text-ink hover:text-ink3 transition-colors"
        >
          SB
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`
                font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200
                ${activeSection === item.id ? "text-ink" : "text-ink3 hover:text-ink"}
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-mono text-[11px] tracking-[0.14em] uppercase text-ink3 hover:text-ink transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-paper flex flex-col justify-center items-center gap-10 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-display font-light text-5xl text-ink hover:text-ink3 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
