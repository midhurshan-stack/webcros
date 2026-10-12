import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { BRAND, SAREES, WHATSAPP } from "../data";
import { Sparkle } from "./Decor";

/*
  A real page-turning book built with Framer Motion.
  Spread 0:  saree 1 | saree 2         (base-left | leaf 0 front)
  Spread 1:  saree 3 | saree 4         (leaf 0 back | leaf 1 front)
  Spread 2:  saree 5 | saree 6         (leaf 1 back | leaf 2 front)
  Spread 3:  brand page | enquiry page (leaf 2 back | base-right)
*/

function PhotoPage({ i, side }: { i: number; side: "left" | "right" }) {
  const s = SAREES[i];
  return (
    <div className={`page page-${side}`}>
      <div className="mount">
        <img src={s.src} alt={s.name} draggable={false} />
      </div>
      <p className="plate">
        <em>{s.name}</em>
        <span>{s.weave}</span>
      </p>
    </div>
  );
}

function BrandPage() {
  return (
    <div className="page page-left page-brand">
      <Sparkle size={34} />
      <h3>{BRAND.name}</h3>
      <p>{BRAND.tagline}</p>
    </div>
  );
}

function EndPage() {
  return (
    <div className="page page-right page-end">
      <h3>Found one you love?</h3>
      <p>Send us the page number and we will share the full drape, price and availability.</p>
      <a className="btn btn-red" href={WHATSAPP} target="_blank" rel="noreferrer">
        Enquire on WhatsApp
      </a>
    </div>
  );
}

type LeafProps = {
  index: number;
  total: number;
  flipped: boolean;
  front: ReactNode;
  back: ReactNode;
  onNext: () => void;
  onPrev: () => void;
};

function Leaf({ index, total, flipped, front, back, onNext, onPrev }: LeafProps) {
  const rot = useMotionValue(0);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    setMoving(true);
    const c = animate(rot, flipped ? -180 : 0, { type: "spring", stiffness: 48, damping: 14, mass: 1.15 });
    c.then(() => setMoving(false));
    return () => c.stop();
  }, [flipped, rot]);

  const frontShade = useTransform(rot, [0, -90], [0, 0.5]);
  const backShade = useTransform(rot, [-90, -180], [0.5, 0]);
  const sheen = useTransform(rot, [0, -90, -180], ["0%", "60%", "100%"]);
  const lift = useTransform(rot, [0, -90, -180], [0, -14, 0]);
  const z = moving ? 60 : flipped ? index + 1 : total - index;

  return (
    <motion.div className="leaf" style={{ rotateY: rot, y: lift, zIndex: z }}>
      <div className="face face-front" onClick={onNext}>
        {front}
        <motion.span className="shade" style={{ opacity: frontShade }} />
        <motion.span className="sheen" style={{ backgroundPositionX: sheen }} />
      </div>
      <div className="face face-back" onClick={onPrev}>
        {back}
        <motion.span className="shade" style={{ opacity: backShade }} />
      </div>
    </motion.div>
  );
}

const CAPTIONS = [
  { title: "Reds that start a wedding", text: "Temple borders and pure zari, the classic bridal drape." },
  { title: "Peacocks, paisleys and purple", text: "Motifs woven the way they were a hundred years ago." },
  { title: "Soft tones for festive evenings", text: "Brocade and silk that photograph as beautifully as they feel." },
  { title: "Your turn", text: "Tell us the occasion and we will pull the right sarees." },
];

export default function Lookbook() {
  const [n, setN] = useState(0); // number of flipped leaves (0-3)
  const LEAVES = 3;
  const next = useCallback(() => setN((v) => Math.min(LEAVES, v + 1)), []);
  const prev = useCallback(() => setN((v) => Math.max(0, v - 1)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.getElementById("lookbook");
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.6 || r.bottom < window.innerHeight * 0.3) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const leaves = [
    { front: <PhotoPage i={1} side="right" />, back: <PhotoPage i={2} side="left" /> },
    { front: <PhotoPage i={3} side="right" />, back: <PhotoPage i={4} side="left" /> },
    { front: <PhotoPage i={5} side="right" />, back: <BrandPage /> },
  ];

  return (
    <section className="lookbook" id="lookbook">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
      >
        <h2>The lookbook</h2>
        <p>Turn the pages. Click a page, use the arrows, or swipe.</p>
      </motion.div>

      <motion.div
        className="book-wrap"
        initial={{ opacity: 0, rotateX: 18, y: 60 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        onPanEnd={(_, info) => {
          if (info.offset.x < -60) next();
          if (info.offset.x > 60) prev();
        }}
      >
        <div className="book" role="group" aria-label="Saree lookbook">
          <div className="base base-left">
            <PhotoPage i={0} side="left" />
          </div>
          <div className="base base-right">
            <EndPage />
          </div>
          {leaves.map((l, i) => (
            <Leaf key={i} index={i} total={LEAVES} flipped={n > i} front={l.front} back={l.back} onNext={next} onPrev={prev} />
          ))}
          <span className="spine" />
        </div>
      </motion.div>

      <div className="book-controls">
        <button className="ctrl" onClick={prev} disabled={n === 0} aria-label="Previous page">
          ‹
        </button>
        <div className="caption" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={n} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <strong>{CAPTIONS[n].title}</strong>
              <span>{CAPTIONS[n].text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <button className="ctrl" onClick={next} disabled={n === LEAVES} aria-label="Next page">
          ›
        </button>
      </div>
    </section>
  );
}
