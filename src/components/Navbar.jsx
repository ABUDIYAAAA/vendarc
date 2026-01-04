import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const items = useMemo(
    () => [
      { label: "Home", href: "#home" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "services", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);

        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
          break; // 👈 VERY IMPORTANT
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-neutral-950/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-2xl font-semibold tracking-tight group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/40 rounded-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-neutral-100 group-hover:text-white transition-colors">
              Vend
            </span>
            <span className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
              arc
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item, index) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/40 rounded-md ${
                    isActive
                      ? "text-neutral-100"
                      : "text-neutral-400 hover:text-neutral-100"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  {item.label}

                  {isActive && (
                    <motion.span
                      className="absolute bottom-1 left-4 right-4 h-px bg-neutral-100"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Mobile dots */}
          <motion.div
            className="md:hidden flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-1">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`h-1.5 rounded-full transition-all ${
                    activeSection === item.href.slice(1)
                      ? "bg-neutral-100 w-4"
                      : "bg-neutral-600 w-1.5"
                  }`}
                  aria-label={item.label}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
    </nav>
  );
}
