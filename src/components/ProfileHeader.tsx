"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BRAND } from "@/data/links";

function LogoRing() {
  return (
    <div style={{ position: "relative", width: 118, height: 118 }}>
      {/* Outer pulse glow */}
      <motion.div
        style={{ position: "absolute", inset: -10, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,39,0.22) 0%, transparent 70%)", pointerEvents: "none" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Rotating conic ring */}
      <motion.div
        style={{ position: "absolute", inset: -3, borderRadius: "50%", background: "conic-gradient(from 0deg, #C9A227 0%, #F5D060 20%, #fff8dc 35%, #C9A227 50%, #a07010 65%, #C9A227 80%, #F5D060 90%, #C9A227 100%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner dark gap */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#070B15" }} />
      {/* Logo image */}
      <div style={{ position: "absolute", inset: 4, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(201,162,39,0.25)" }}>
        <Image src="/logo.jpg" alt="Danar Capital Logo" fill sizes="110px" style={{ objectFit: "cover", objectPosition: "center" }} priority />
      </div>
    </div>
  );
}

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } } };

export default function ProfileHeader() {
  return (
    <motion.div className="flex flex-col items-center gap-4 pb-1" variants={container} initial="hidden" animate="visible">
      <motion.div variants={item}><LogoRing /></motion.div>

      <motion.div className="flex flex-col items-center gap-1" variants={item}>
        <h1 style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 800, fontSize: "clamp(22px,6vw,28px)", letterSpacing: "-.3px", lineHeight: 1.2, background: "linear-gradient(135deg,#C9A227 0%,#F0C040 40%,#C9A227 100%)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {BRAND.name}
        </h1>
        <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: ".18em", color: "rgba(201,162,39,.5)", textTransform: "uppercase" }}>
          {BRAND.nameEn}
        </p>
      </motion.div>

      <motion.div variants={item} style={{ width: 40, height: 1, background: "linear-gradient(90deg,transparent,rgba(201,162,39,.45),transparent)" }} />

      <motion.div className="flex flex-col items-center gap-1" variants={item}>
        <p style={{ fontFamily: "'Tajawal',sans-serif", fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,.78)" }}>{BRAND.tagline}</p>
        <div className="flex items-center gap-2">
          {BRAND.taglineSub.split(" · ").map((tag, i, arr) => (
            <span key={tag} className="flex items-center gap-2">
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: ".12em", color: "rgba(201,162,39,.5)", textTransform: "uppercase" }}>{tag}</span>
              {i < arr.length - 1 && <span style={{ color: "rgba(201,162,39,.25)", fontSize: 7 }}>◆</span>}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(201,162,39,.18)", backdropFilter: "blur(20px)" }}>
          <motion.div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} animate={{ scale: [1, 1.4, 1], opacity: [.8, 1, .8] }} transition={{ duration: 2, repeat: Infinity }} />
          <span style={{ fontFamily: "'Tajawal',sans-serif", fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,.6)" }}>
            شريك رسمي لـ <span style={{ fontFamily: "'Montserrat',sans-serif", color: "#C9A227", fontWeight: 700, fontSize: 11 }}>XTB</span> Broker
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
