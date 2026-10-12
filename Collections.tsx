import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SAREES } from "../data";

const ITEMS = [
  { img: SAREES[0], title: "Bridal Kanjivaram", note: "Heavy zari, temple borders" },
  { img: SAREES[1], title: "Peacock borders", note: "The motif behind our name" },
  { img: SAREES[5], title: "Festive brocade", note: "Light to drape, rich to see" },
];

function Tilt({ i, img, title, note }: { i: number; img: (typeof SAREES)[number]; title: string; note: string }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  return (
    <motion.article
      className="tilt"
      initial={{ clipPath: "inset(100% 0 0 0)", y: 40 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: i * 0.14, ease: [0.7, 0, 0.2, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <img src={img.src} alt={img.name} />
      <div className="tilt-label">
        <h3>{title}</h3>
        <p>{note}</p>
      </div>
    </motion.article>
  );
}

export default function Collections() {
  return (
    <section className="collections" id="collections">
      <div className="section-head">
        <h2>Collections</h2>
        <p>Three ways into the shop.</p>
      </div>
      <div className="tilt-grid">
        {ITEMS.map((it, i) => (
          <Tilt key={it.title} i={i} {...it} />
        ))}
      </div>
    </section>
  );
}
