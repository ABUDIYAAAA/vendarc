import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Check, Github, Linkedin, Twitter } from "lucide-react";
import { BGPattern } from "./ui/bg-pattern";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [buttonState, setButtonState] = useState("normal");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setButtonState("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.status === 429) {
      setError("You're sending requests too quickly. Try again later.");
      setButtonState("normal");
      return;
    }

    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      setButtonState("normal");
      return;
    }
    setButtonState("sent");

    setButtonState("normal");
    setEmail("");
  };

  return (
    <footer className="relative border-t border-neutral-900 py-16 overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Contact Section */}
        <div className="relative max-w-7xl mx-auto mb-16">
          <motion.div
            className="relative rounded-3xl border border-neutral-800 bg-black backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-12 md:gap-0 p-8 md:p-12 md:divide-x md:divide-neutral-800">
              {/* Left */}
              <div className="flex flex-col justify-center space-y-4 md:pr-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Contact us
                </h2>

                <form onSubmit={handleSubmit} className="space-y-2 mt-8">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="Your mail address"
                        disabled={buttonState !== "normal"}
                        className={`w-full pl-10 pr-3 py-2.5 bg-neutral-900/50 border ${
                          error
                            ? "border-red-500 border-2"
                            : "border-neutral-800"
                        } rounded-lg text-sm text-neutral-300 placeholder:text-neutral-600 focus:outline-none focus:ring-2 ${
                          error
                            ? "focus:ring-red-500"
                            : "focus:ring-neutral-700"
                        } transition-all disabled:opacity-50`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={buttonState !== "normal"}
                      className="px-4 py-2.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all disabled:opacity-70 flex items-center gap-2 flex-shrink-0"
                    >
                      {buttonState === "normal" && "Get Started"}
                      {buttonState === "sending" && (
                        <>
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Sending
                        </>
                      )}
                      {buttonState === "sent" && (
                        <>
                          <Check className="w-4 h-4" />
                          Sent
                        </>
                      )}
                    </button>
                  </div>

                  <div className="min-h-[1rem]">
                    {error && (
                      <p className="text-red-500 text-xs ml-1">{error}</p>
                    )}
                  </div>
                </form>
              </div>

              {/* Right */}
              <div className="flex flex-col justify-center space-y-4 md:pl-12">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Let's Work Together
                  </h3>
                  <p className="text-neutral-400 leading-relaxed mt-2">
                    Have a project in mind? Let's build something focused,
                    thoughtful, and impactful.
                  </p>
                </div>

                <div className="flex gap-4 justify-end mt-8">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="flex flex-col items-center justify-center gap-3 pb-8 ">
              <a
                href="#home"
                className="text-xl font-semibold tracking-tight group focus-visible:ring-2 focus-visible:ring-neutral-300/40 rounded-md"
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
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
