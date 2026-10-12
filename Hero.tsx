import { motion, animate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import Orbit from "./Orbit";
import PeacockFeather from "./PeacockFeather";
import { FloatingJasmine, Sparkle } from "./Decor";
import { useWindowSize } from "../hooks";
import { BRAND, WHATSAPP } from "../data";

export default function Hero() {
  const reduced = !!useReducedMotion();
  const { w, h } = useWindowSize();

  // reveal: 0 -> 1 as the feather "writes" the name. settle: feather moves to its resting place.
  const reveal = useMotionValue(reduced ? 1 : 0);
  const settle = useMotionValue(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const a = animate(reveal, 1, { duration: 4, delay: 1.1, ease: [0.65, 0, 0.35, 1] });
    const b = animate(settle, 1, { duration: 1.8, delay: 5.3, ease: "easeInOut" });
    return () => {
      a.stop();
      b.stop();
    };
  }, [reduced, reveal, settle]);

  const clip = useTransform(reveal, (v) => `inset(-25% ${Math.max(0, (1 - v) * 100).toFixed(2)}% -25% -4%)`);
  const featherLeft = useTransform(reveal, (v) => `${(v * 100).toFixed(2)}%`);
  const featherX = useTransform(settle, (s) => `${(-17 + s * 20).toFixed(2)}%`);
  const featherY = useTransform([reveal, settle], ([v, s]: number[]) => {
    const write = Math.sin(v * 38) * 0.035 * (1 - s);
    return `${(write - s * 0.16).toFixed(3)}em`;
  });
  const featherRot = useTransform([reveal, settle], ([v, s]: number[]) => {
    return Math.sin(v * 30) * 7 * (1 - s) + s * 10;
  });

  // pointer parallax for the orbiting sarees
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });

  const rx = Math.min(Math.max(w * 0.4, 140), 640);
  const ry = Math.min(Math.max(h * 0.3, 110), 300);

  return (
    <section
      className="hero"
      id="top"
      onMouseMove={(e) => {
        mx.set((e.clientX / w - 0.5) * 2);
        my.set((e.clientY / h - 0.5) * 2);
      }}
    >
      <div className="hero-stage">
        <motion.div
          className="hero-video"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.2 }}
        >
          {reduced ? (
            <img src="/hero-poster.jpg" alt="" />
          ) : (
            <video src="/hero.mp4" poster="/hero-poster.jpg" autoPlay muted loop playsInline preload="auto" />
          )}
          <span className="hero-veil" />
        </motion.div>
        <svg className="orbit-ring" width={rx * 2} height={ry * 2} viewBox={`${-rx} ${-ry} ${rx * 2} ${ry * 2}`} aria-hidden="true">
          <motion.ellipse
            cx="0"
            cy="0"
            rx={rx}
            ry={ry}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 3, delay: 0.4, ease: "easeInOut" }}
          />
        </svg>

        <Orbit rx={rx} ry={ry} mx={smx} my={smy} reduced={reduced} />
        <FloatingJasmine />

        <div className="hero-copy">
          <motion.div
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.0, duration: 1 }}
          >
            <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 5.0, duration: 1.2, ease: "easeOut" }} style={{ originX: 1 }} />
            <motion.span initial={{ letterSpacing: "0.9em", opacity: 0 }} animate={{ letterSpacing: "0.32em", opacity: 1 }} transition={{ delay: 5.0, duration: 1.6, ease: "easeOut" }}>
              {BRAND.tagline.toUpperCase()}
            </motion.span>
            <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 5.0, duration: 1.2, ease: "easeOut" }} style={{ originX: 0 }} />
            <motion.span
              className="tagline-star"
              initial={{ rotate: -180, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: [0, 1.25, 1], opacity: 1 }}
              transition={{ delay: 5.6, duration: 1.1 }}
            >
              <Sparkle size={40} />
            </motion.span>
          </motion.div>

          <div className="title-wrap">
            <motion.h1 className="title" style={{ clipPath: clip }}>
              {BRAND.name}
            </motion.h1>

            <motion.div className="feather-pin" style={{ left: featherLeft }} aria-hidden="true">
              <motion.div style={{ x: featherX, y: featherY, rotate: featherRot, transformOrigin: "17% 95%" }}>
                <motion.div
                  animate={{ rotate: [-1.5, 2, -1.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "17% 95%" }}
                >
                  <PeacockFeather className="feather" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="cta-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.8, type: "spring", stiffness: 70, damping: 14 }}
          >
            <a className="btn btn-red" href="#lookbook">
              Browse the lookbook
            </a>
            <a className="btn btn-ghost" href={WHATSAPP} target="_blank" rel="noreferrer">
              Talk to us on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
