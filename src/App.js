// src/App.js
import React, { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Layout/Header/Header";
import SocialLinks from "./components/common/SocialLinks/SocialLinks";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./app.css";

const Hero = lazy(() => import("./components/Sections/Hero/Hero"));
const About = lazy(() => import("./components/Sections/About/About"));
const Skills = lazy(() => import("./components/Sections/Skills/Skills"));
const Projects = lazy(() => import("./components/Sections/Projects/Projects"));

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-paper">
    <span className="font-mono text-xs tracking-widest text-ink3 uppercase animate-pulse">
      Loading…
    </span>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-paper text-ink font-body">
        <Header />
        <main>
          <Suspense fallback={<Loader />}>
            <Hero />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <Projects />
          </Suspense>
        </main>
        <SocialLinks />
      </div>
      <SpeedInsights />
    </ThemeProvider>
  );
}
