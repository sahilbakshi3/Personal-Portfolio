// src/components/ui/Cursor.jsx
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const mx = useRef(-100);
  const my = useRef(-100);
  const cx = useRef(-100);
  const cy = useRef(-100);
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };
    window.addEventListener("mousemove", move);

    const expand = () =>
      dotRef.current?.classList.add("scale-[5]", "opacity-10");
    const collapse = () =>
      dotRef.current?.classList.remove("scale-[5]", "opacity-10");
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", collapse);
    });

    const loop = () => {
      cx.current += (mx.current - cx.current) * 0.18;
      cy.current += (my.current - cy.current) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cx.current - 4}px, ${cy.current - 4}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-2 h-2 bg-ink rounded-full pointer-events-none z-[9999] transition-transform duration-200 mix-blend-multiply"
      style={{ willChange: "transform" }}
    />
  );
}
