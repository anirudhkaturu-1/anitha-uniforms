import React from "react";
import { motion } from "framer-motion";

const Delivered = () => {
  // Example placeholders for institute logos
  const logos = [
    { id: 1, name: "Institute A" },
    { id: 2, name: "Hospital B" },
    { id: 3, name: "College C" },
    { id: 4, name: "Corporate D" },
    { id: 5, name: "Medical Center E" },
    { id: 6, name: "University F" },
  ];

  return (
    <section className="px-6 py-16 md:px-24 bg-neutral-50 border-y border-neutral-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        {/* Left Side: Editorial Heading */}
        <div className="max-w-md">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 30 }}
            className="h-[2px] bg-[#eb1c77] mb-4"
          />
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tighter uppercase italic leading-none">
            Institutes we have <br />
            <span className="text-[#eb1c77] not-italic">delivered</span>
          </h2>
          <p className="text-neutral-500 text-xs md:text-sm font-medium mt-3 tracking-wide">
            We’ve suited up India's leading institutions with
            precision-engineered apparel.
          </p>
        </div>

        {/* Right Side: Logo Grid / Showcase */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8 opacity-60">
            {logos.map((logo) => (
              <motion.div
                key={logo.id}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="h-16 md:h-20 bg-white border border-neutral-200 flex items-center justify-center rounded-sm grayscale hover:grayscale-0 transition-all duration-300 group cursor-default"
              >
                {/* Replace this span with your actual <img> tags */}
                <span className="text-[10px] font-bold text-neutral-400 group-hover:text-[#eb1c77] tracking-widest uppercase text-center px-2">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Counter (Optional) */}
      <div className="mt-12 pt-8 border-t border-neutral-200/50 flex flex-wrap gap-8 justify-center md:justify-start">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-neutral-900">500+</span>
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
            Schools
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-neutral-900">120+</span>
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
            Hospitals
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-neutral-900">50k+</span>
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
            Uniforms Monthly
          </span>
        </div>
      </div>
    </section>
  );
};

export default Delivered;
