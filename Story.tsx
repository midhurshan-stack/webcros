import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SAREES } from "../data";

const TEXT =
  "Every saree we stock has a weaver, a loom and a reason. We choose silks that hold their zari for decades, borders that tell a story, and colours that look as good in daylight as under wedding lights. Six yards, chosen with care, for the day you will remember.";

function Word({ w, p, range }: { w: string; p: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(p, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="word">
      {w}{" "}
    </motion.span>
  );
}

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const words = TEXT.split(" ");

  return (
    <section className="story" id="story" ref={ref}>
      <div className="story-inner">
        <p className="story-text">
          {words.map((w, i) => (
            <Word key={i} w={w} p={scrollYProgress} range={[i / words.length * 0.85, Math.min(1, i / words.length * 0.85 + 0.12)]} />
          ))}
        </p>
        <div className="story-img">
          <motion.img style={{ y: imgY }} src={SAREES[4].src} alt="Coral and green silk saree with gold border" />
        </div>
      </div>
    </section>
  );
}
