import React from "react";

/**
 * LightGlassBackground
 * - Subtle, layered radial gradients with blur and soft motion
 * - Built only with divs + Tailwind arbitrary values (no images/WebGL)
 * - Designed to sit absolutely behind your Hero content
 */
export default function LightGlassBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-white">
      {/* Big soft blobs (brand colors) */}
      <div
        className="
          absolute -top-40 -left-32
          w-[65vw] h-[65vw]
          opacity-[0.35] blur-[120px]
          animate-drift-slow
          [background:radial-gradient(50%_50%_at_50%_50%,_#40ffaa_0%,_transparent_60%)]
        "
        style={{ animationDelay: "0s" }}
      />
      <div
        className="
          absolute -bottom-48 -right-32
          w-[70vw] h-[70vw]
          opacity-[0.30] blur-[130px]
          animate-drift-slow
          [background:radial-gradient(50%_50%_at_50%_50%,_#4079ff_0%,_transparent_60%)]
        "
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="
          absolute top-[20%] left-[25%]
          w-[45vw] h-[45vw]
          opacity-[0.25] blur-[110px]
          animate-drift-slow
          [background:radial-gradient(50%_50%_at_50%_50%,_#40ffaa_0%,_transparent_60%)]
        "
        style={{ animationDelay: "2.4s" }}
      />

      {/* Gentle white veil for glassy feel */}
      <div className="absolute inset-0 bg-white/40" />

      {/* Optional soft vignette to focus center */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(70%_60%_at_50%_40%,_black_40%,_transparent_100%)]" />
    </div>
  );
}
