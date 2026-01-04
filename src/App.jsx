import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { BackToTop } from "./components/BackToTop";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.classList.add("dark");

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className="
        relative
        bg-neutral-950
        text-neutral-100
        overflow-x-hidden
      "
    >
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      <Hero />
      <Services />

      <Footer />
      <BackToTop />
    </div>
  );
}
