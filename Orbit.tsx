import { MotionValue, motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { SAREES } from "../data";

type Props = {
  rx: number;
  ry: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduced: boolean;
};

// Closed-form orbit: fast spin that decelerates to a slow drift, so the sarees "settle" around the title.
const FAST = 2.6; // rad/s at start
const SLOW = 0.1; // rad/s idle drift
const TAU = 1.7; // seconds to decay
const INTRO_START = 0.15;

function angleAt(t: number, drift: boolean) {
  const a = (FAST - SLOW) * TAU * (1 - Math.exp(-t / TAU));
  return a + (drift ? SLOW * t : SLOW * 6);
}
const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

function Card({ index, total, props }: { index: number; total: number; props: React.MutableRefObject<Props> }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0.3);
  const rotateZ = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const opacity = useMotionValue(0);
  const zIndex = useMotionValue(1);
  const filter = useMotionValue("blur(0px)");

  useAnimationFrame((time) => {
    const p = props.current;
    const t = p.reduced ? 7 : time / 1000;
    const spread = easeOut((t - INTRO_START) / 1.6);
    const th = (index * 2 * Math.PI) / total + angleAt(t, !p.reduced);
    const c = Math.cos(th);
    const s = Math.sin(th);
    const d = (s + 1) / 2; // 0 = far side, 1 = near side
    const par = 10 + 22 * d;
    x.set(c * p.rx * spread + p.mx.get() * par);
    y.set(s * p.ry * spread + p.my.get() * par);
    scale.set((0.5 + 0.7 * d) * (0.35 + 0.65 * spread));
    rotateZ.set(c * 9);
    rotateY.set(-c * 28);
    opacity.set(spread * (0.55 + 0.45 * d));
    zIndex.set(d > 0.5 ? 3 : 1);
    filter.set(`blur(${((1 - d) * 2.2).toFixed(2)}px)`);
  });

  return (
    <motion.div className="orbit-card" style={{ x, y, scale, rotateZ, rotateY, opacity, zIndex, filter }}>
      <img src={SAREES[index].src} alt="" draggable={false} />
    </motion.div>
  );
}

export default function Orbit(props: Props) {
  const ref = useRef(props);
  ref.current = props;
  return (
    <div className="orbit" aria-hidden="true">
      {SAREES.map((_, i) => (
        <Card key={i} index={i} total={SAREES.length} props={ref} />
      ))}
    </div>
  );
}
