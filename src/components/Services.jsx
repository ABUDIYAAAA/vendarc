import { motion, useScroll, useTransform } from "framer-motion";
import { Layout, Server, Layers, Plug, Brain, Gauge } from "lucide-react";
import { useRef } from "react";
import { BGPattern } from "./ui/bg-pattern";

const services = [
  {
    title: "Frontend Development",
    description:
      "Crafting clean, responsive interfaces with modern frameworks and strong attention to detail.",
    icon: <Layout size={20} />,
  },
  {
    title: "Backend Development",
    description:
      "Building scalable, secure server-side systems that power real-world applications.",
    icon: <Server size={20} />,
  },
  {
    title: "Full Stack Solutions",
    description:
      "End-to-end product development from architecture to deployment.",
    icon: <Layers size={20} />,
  },
  {
    title: "API Design & Integrations",
    description:
      "Designing robust APIs and integrating third-party services to connect systems seamlessly.",
    icon: <Plug size={20} />,
  },
  {
    title: "AI-Powered Features",
    description:
      "Implementing practical AI features like automation and intelligent workflows.",
    icon: <Brain size={20} />,
  },
  {
    title: "Performance & Scalability",
    description: "Optimizing applications for speed, reliability, and growth.",
    icon: <Gauge size={20} />,
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* PATH PROGRESS */
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 0.7]);

  /* PATH PARALLAX */
  const pathX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  /* GRADIENT FOLLOW */
  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-neutral-950 py-48 overflow-hidden"
    >
      <BGPattern
        variant="dots"
        mask="fade-edges"
        fill="rgba(255,255,255,0.03)"
        className="z-0"
      />
      {/* HEADER */}
      <div className="text-center mb-48 relative z-20">
        <h2 className="text-5xl font-bold text-neutral-100">What We Do</h2>
        <p className="text-neutral-400 mt-4 text-lg">
          Focused, high-quality web development services
        </p>
      </div>

      {/* PATH CONTAINER (starts AFTER header) */}
      <div className="absolute inset-x-0 top-[420px] bottom-0 pointer-events-none">
        <motion.svg
          viewBox="0 0 600 2400"
          className="absolute left-1/2 -translate-x-1/2 h-full w-[700px]"
          fill="none"
        >
          <defs>
            <linearGradient id="pathGradient" gradientUnits="userSpaceOnUse">
              <motion.stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <motion.stop
                offset={gradientY}
                stopColor="rgba(255,255,255,0.5)"
              />
              <motion.stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>

          {/* GLOW */}
          <motion.path
            d="
              M300 -100
              C120 300, 120 700, 300 1000
              C480 1300, 480 1700, 300 2000
              C120 2300, 120 2600, 300 3000
            "
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="28"
            strokeLinecap="round"
            style={{ pathLength }}
          />

          {/* CORE GRADIENT */}
          <motion.path
            d="
              M300 -100
              C120 300, 120 700, 300 1000
              C480 1300, 480 1700, 300 2000
              C120 2300, 120 2600, 300 3000
            "
            stroke="url(#pathGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </motion.svg>
      </div>

      {/* CARDS */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-40 px-6">
        {services.map((service, i) => (
          <ServiceCard
            key={service.title}
            service={service}
            side={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* CARD */
/* ---------------------------------- */

function ServiceCard({ service, side }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: side === "left" ? -120 : 120,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-200px" }}
      className={`
        max-w-md
        ${side === "left" ? "mr-auto text-right" : "ml-auto text-left"}
      `}
    >
      <div className="bg-neutral-900/70 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-neutral-300">{service.icon}</div>
          <h3 className="text-xl font-semibold text-neutral-100">
            {service.title}
          </h3>
        </div>
        <p className="text-neutral-400 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
