import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Sparkle } from "./Decor";

const LINKS = [
  { href: "#lookbook", label: "Lookbook" },
  { href: "#collections", label: "Collections" },
  { href: "#story", label: "Our story" },
  { href: "#visit", label: "Visit" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 60));

  return (
    <motion.header
      className={`nav ${solid ? "nav-solid" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 5.4, duration: 0.9, ease: "easeOut" }}
    >
      <a className="nav-logo" href="#top" aria-label="theera asai home">
        <Sparkle size={20} />
        theera asai
      </a>
      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <button className="nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span />
        <span />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-drawer"
            initial={{ clipPath: "circle(0% at 92% 0%)" }}
            animate={{ clipPath: "circle(150% at 92% 0%)" }}
            exit={{ clipPath: "circle(0% at 92% 0%)" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
