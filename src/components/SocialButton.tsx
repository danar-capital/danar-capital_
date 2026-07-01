"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import type { LinkItem } from "@/data/links";
import { XIcon, SnapchatIcon, TikTokIcon, TelegramIcon, WhatsAppIcon, XTBIcon } from "@/components/SocialIcons";

const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  x: XIcon,
  snapchat: SnapchatIcon,
  tiktok: TikTokIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
  xtb: XTBIcon,
};

function PlatformIcon({ link }: { link: LinkItem }) {
  if (link.iconId === "xtb") {
    return <img src="/xtb-logo.png" alt="XTB" style={{ width: 36, height: 36, objectFit: "contain" }} />;
  }
  const Icon = ICON_MAP[link.iconId];
  if (!Icon) return null;
  return <Icon style={{ width: 20, height: 20, color: link.color, flexShrink: 0 }} />;
}

const variants = {
  hidden: { opacity: 0, y: 26, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 210, damping: 20, delay: 0.5 + i * 0.1 },
  }),
};

export default function SocialButton({ link, index }: { link: LinkItem; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-1, 1], [3, -3]), { stiffness: 400, damping: 38 });
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-3, 3]), { stiffness: 400, damping: 38 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div custom={index} variants={variants} initial="hidden" animate="visible" style={{ perspective: 900 }}>
      <motion.a
        ref={ref}
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
        aria-label={link.label}
        style={{
          rotateX, rotateY, transformStyle: "preserve-3d",
          display: "flex", alignItems: "center",
          position: "relative", height: 66,
          padding: "0 18px", gap: 14,
          borderRadius: 20, textDecoration: "none",
          userSelect: "none",
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ scale: 1.028 }}
        whileTap={{ scale: 0.968 }}
        className="group"
      >
        {/* Glass base */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 20, background: "rgba(7,11,21,0.55)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", boxShadow: "0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)" }} />

        {/* Platform gradient — visible on hover */}
        <div className="btn-grad" style={{ position: "absolute", inset: 0, borderRadius: 20, background: link.gradient, opacity: 0, transition: "opacity .3s ease" }} />

        {/* Shimmer overlay */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 20, background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.06) 100%)", pointerEvents: "none" }} />

        {/* Color glow border on hover */}
        <div className="btn-glow" style={{ position: "absolute", inset: 0, borderRadius: 20, boxShadow: `0 0 0 1px ${link.color}55, 0 8px 36px ${link.glowColor}`, opacity: 0, transition: "opacity .3s ease", pointerEvents: "none" }} />

        {/* Icon */}
        <div style={{ position: "relative", zIndex: 1, width: 42, height: 42, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: `${link.color}18`, border: `1px solid ${link.color}38`, transition: "transform .2s ease, box-shadow .2s ease" }} className="btn-icon">
          <PlatformIcon link={link} />
        </div>

        {/* Labels */}
        <div style={{ position: "relative", zIndex: 1, flex: 1, minWidth: 0, direction: "rtl" }}>
          <p style={{ fontFamily: "'Tajawal',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{link.label}</p>
          {link.sublabel && (
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: 11, color: "rgba(217,217,217,.48)", marginTop: 1, direction: "ltr", textAlign: "right", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{link.sublabel}</p>
          )}
        </div>

        {/* Arrow */}
        <ArrowLeft size={15} style={{ position: "relative", zIndex: 1, flexShrink: 0, color: link.color, opacity: .38, transition: "all .2s ease" }} className="btn-arrow" />

        {/* Hover CSS */}
        <style>{`
          .group:hover .btn-grad { opacity: 1 !important; }
          .group:hover .btn-glow { opacity: 1 !important; }
          .group:hover .btn-icon { transform: scale(1.1); box-shadow: 0 0 14px ${link.color}40; }
          .group:hover .btn-arrow { opacity: .88 !important; transform: translateX(-3px); }
        `}</style>
      </motion.a>
    </motion.div>
  );
}
