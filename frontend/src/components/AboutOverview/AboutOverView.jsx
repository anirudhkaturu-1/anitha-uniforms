import React from "react";
import { motion } from "framer-motion";

const AboutOverView = () => {
  return (
    <section className="relative px-6 py-16 md:px-24 md:py-24 bg-neutral-50 overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-100/50 -skew-x-12 translate-x-20 z-0 hidden md:block"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Image Section - The "Product Spotlight" */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2 flex justify-center"
        >
          {/* Subtle background glow for the product */}
          <div className="absolute inset-0 bg-pink-100/30 blur-3xl rounded-full scale-75"></div>

          <img
            src="https://knyamed.com/cdn/shop/files/Homepage_section.png?v=1760533516&width=1500"
            alt="DRIFT Jacket"
            className="relative w-full max-w-[500px] h-auto drop-shadow-2xl object-contain transition-transform duration-700 hover:scale-105"
          />
        </motion.div>

        {/* Text Section - The "Editorial Copy" */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="space-y-2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#eb1c77] font-bold tracking-[0.3em] text-[10px] uppercase"
            >
              Innovation Spotlight
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-neutral-900 leading-tight tracking-tighter uppercase italic"
            >
              DRIFT:{" "}
              <span className="text-neutral-400 not-italic font-light">
                The Jacket for Medicos
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Vertical Accent Line */}
            <div className="absolute left-[-24px] top-0 w-[2px] h-full bg-neutral-200 hidden md:block"></div>

            <p className="text-neutral-600 text-lg md:text-xl leading-relaxed font-light">
              India’s first winter jacket for medicos — engineered for{" "}
              <span className="text-neutral-900 font-semibold italic text-pink-600/80">
                warmth, movement, and focus
              </span>
              . Featuring fleece-bonded fabric, stretch panels, and
              utility-driven pockets. Built for layering over scrubs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
            <button className="group relative px-12 py-4 bg-neutral-900 text-white overflow-hidden rounded-sm transition-all duration-300 hover:bg-[#eb1c77]">
              <span className="relative z-10 font-bold tracking-widest text-xs uppercase">
                Shop The Collection
              </span>
              <div className="absolute inset-0 bg-[#eb1c77] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutOverView;
