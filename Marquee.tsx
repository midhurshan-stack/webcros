import { motion } from "framer-motion";
import { Sparkle } from "./Decor";

const WORDS = ["Kanjivaram", "Banarasi", "Pure zari", "Bridal silk", "Handloom", "Temple borders", "Festive wear"];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee-track" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 32, ease: "linear", repeat: Infinity }}>
        {[0, 1].map((k) => (
          <div className="marquee-row" key={k}>
            {row.map((w, i) => (
              <span key={`${k}-${i}`}>
                {w}
                <Sparkle size={16} />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
