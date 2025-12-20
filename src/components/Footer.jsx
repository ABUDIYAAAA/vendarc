import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-neutral-900/70 py-8 overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Brand */}
          <motion.div
            className="flex flex-col items-center md:items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a
              href="#home"
              className="text-xl font-semibold tracking-tight group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/40 rounded-md"
            >
              <span className="text-neutral-100 group-hover:text-white transition-colors">
                Vend
              </span>
              <span className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                arc
              </span>
            </a>
            <p className="text-xs text-neutral-600">
              © {currentYear} Vendarc. All rights reserved.
            </p>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        />
      </div>
    </footer>
  );
}
