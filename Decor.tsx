import { motion } from "framer-motion";

export function Sparkle({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 0.6C12 7.4 16.6 12 23.4 12C16.6 12 12 16.6 12 23.4C12 16.6 7.4 12 0.6 12C7.4 12 12 7.4 12 0.6Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Jasmine({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-22 -22 44 44" aria-hidden="true">
      <g fill="#fffdfc" stroke="#e3d3d3" strokeWidth="0.8">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-10" rx="6" ry="10" transform={`rotate(${a})`} />
        ))}
      </g>
      <circle r="3.2" fill="#e8c768" />
    </svg>
  );
}

const FLOWERS = [
  { l: "8%", t: "62%", s: 40, d: 0 },
  { l: "17%", t: "28%", s: 30, d: 1.2 },
  { l: "84%", t: "70%", s: 46, d: 0.6 },
  { l: "91%", t: "38%", s: 34, d: 1.8 },
  { l: "46%", t: "90%", s: 28, d: 2.4 },
];

export function FloatingJasmine() {
  return (
    <>
      {FLOWERS.map((f, i) => (
        <motion.span
          key={i}
          className="jasmine"
          style={{ left: f.l, top: f.t }}
          initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
          animate={{ opacity: 0.9, scale: 1, rotate: [0, 14, -10, 0], y: [0, -14, 6, 0] }}
          transition={{
            opacity: { delay: 3 + f.d * 0.3, duration: 1.2 },
            scale: { delay: 3 + f.d * 0.3, duration: 1.2 },
            rotate: { delay: 3, duration: 11 + i, repeat: Infinity, ease: "easeInOut" },
            y: { delay: 3, duration: 9 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Jasmine size={f.s} />
        </motion.span>
      ))}
    </>
  );
}
