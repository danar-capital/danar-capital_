"use client";

// CSS-based background layers — depth, orbs, streaks, noise
// Sits behind the Three.js canvas
export default function AnimatedBackground() {
  return (
    <>
      {/* Base radial gradient */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 140% 100% at 50% -10%, #0b1c38 0%, #070B15 60%)" }}
        aria-hidden="true"
      />
      {/* Gold orb — top-right */}
      <div className="pointer-events-none fixed z-0" style={{ top: "-10%", right: "-15%", width: "50vw", height: "50vw", maxWidth: 440, maxHeight: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,39,.18) 0%, rgba(201,162,39,.04) 50%, transparent 70%)", animation: "floatB 11s ease-in-out infinite" }} aria-hidden="true" />
      {/* Blue orb — top-left */}
      <div className="pointer-events-none fixed z-0" style={{ top: "-15%", left: "-15%", width: "60vw", height: "60vw", maxWidth: 520, maxHeight: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(27,58,107,.35) 0%, rgba(27,58,107,.06) 50%, transparent 70%)", animation: "floatA 9s ease-in-out infinite" }} aria-hidden="true" />
      {/* Bottom orb */}
      <div className="pointer-events-none fixed z-0" style={{ bottom: "-5%", left: "50%", transform: "translateX(-50%)", width: "65vw", height: "65vw", maxWidth: 540, maxHeight: 540, borderRadius: "50%", background: "radial-gradient(circle, rgba(27,58,107,.14) 0%, transparent 65%)", animation: "floatC 8s ease-in-out infinite" }} aria-hidden="true" />
      {/* Diagonal light streaks */}
      <div className="pointer-events-none fixed z-0" style={{ top: "-10%", right: "15%", width: "1px", height: "130%", background: "linear-gradient(180deg, transparent, rgba(201,162,39,.08) 30%, rgba(201,162,39,.14) 50%, rgba(201,162,39,.08) 70%, transparent)", transform: "rotate(-22deg)", transformOrigin: "top center" }} aria-hidden="true" />
      <div className="pointer-events-none fixed z-0" style={{ top: "-10%", left: "28%", width: "1px", height: "130%", background: "linear-gradient(180deg, transparent, rgba(27,58,107,.1) 30%, rgba(27,58,107,.16) 50%, rgba(27,58,107,.1) 70%, transparent)", transform: "rotate(-16deg)", transformOrigin: "top center" }} aria-hidden="true" />
      {/* Film grain noise */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{ opacity: .022, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }} aria-hidden="true" />
    </>
  );
}
