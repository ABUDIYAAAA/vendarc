import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "./ui/aurora-background";
import "./hero.css";
const TEXTS = [
  "Systems That Scale",
  "Platforms, Not Just Products",
  "Infrastructure For Growth",
  "Digital Experiences",
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");

  const textIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);
  const lastTime = useRef(null);
  const pauseUntil = useRef(null);

  const TYPE_SPEED = 100; // ms per char
  const DELETE_SPEED = 50;
  const PAUSE_AFTER = 1200;

  useEffect(() => {
    let rafId;

    const loop = (time) => {
      if (lastTime.current === null) {
        lastTime.current = time;
        rafId = requestAnimationFrame(loop);
        return;
      }

      const delta = time - lastTime.current;
      const current = TEXTS[textIndex.current];
      const speed = deleting.current ? DELETE_SPEED : TYPE_SPEED;

      // Pause logic
      if (pauseUntil.current && time < pauseUntil.current) {
        rafId = requestAnimationFrame(loop);
        return;
      } else {
        pauseUntil.current = null;
      }

      if (delta >= speed) {
        lastTime.current = time;

        if (!deleting.current && charIndex.current < current.length) {
          charIndex.current++;
          setDisplayText(current.slice(0, charIndex.current));
        } else if (!deleting.current && charIndex.current === current.length) {
          pauseUntil.current = time + PAUSE_AFTER;
          deleting.current = true;
        } else if (deleting.current && charIndex.current > 0) {
          charIndex.current--;
          setDisplayText(current.slice(0, charIndex.current));
        } else if (deleting.current && charIndex.current === 0) {
          deleting.current = false;
          textIndex.current = (textIndex.current + 1) % TEXTS.length;
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="relative h-screen">
      <div className="sticky top-0 h-screen overflow-hidden">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full flex flex-col items-center justify-center gap-10 px-6 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight">
              <span className="block text-neutral-100">We Build</span>

              <span className="block text-neutral-400 min-h-[1.2em]">
                <span className="inline-flex items-center">
                  {displayText}
                  <span className="cursor" />
                </span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto font-light">
              Freelance developers specializing in elegant web solutions —
              frontend to backend.
            </p>
          </motion.div>
        </AuroraBackground>
      </div>
    </section>
  );
}
