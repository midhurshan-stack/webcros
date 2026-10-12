import { motion } from "framer-motion";
import { BRAND, WHATSAPP } from "../data";
import { Sparkle } from "./Decor";

export default function Visit() {
  return (
    <>
      <section className="visit" id="visit">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="visit-card"
        >
          <h2>Come and feel the silk</h2>
          <p>Visit the boutique, or send us a message and we will show you sarees over a video call.</p>
          <dl>
            <div>
              <dt>Boutique</dt>
              <dd>Your address here</dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>Daily, 10am to 8pm</dd>
            </div>
          </dl>
          <a className="btn btn-red" href={WHATSAPP} target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
        </motion.div>
      </section>
      <footer className="footer">
        <Sparkle size={26} />
        <strong>{BRAND.name}</strong>
        <span>{BRAND.tagline}</span>
      </footer>
      <motion.a
        className="wa-float"
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 6.2, type: "spring", stiffness: 200, damping: 12 }}
      >
        <motion.span animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        Chat
      </motion.a>
    </>
  );
}
