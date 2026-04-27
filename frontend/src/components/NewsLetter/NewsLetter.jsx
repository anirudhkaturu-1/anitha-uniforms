import React from "react";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

const NewsLetter = () => {
  return (
    <section className="px-6 py-12 md:px-24">
      <div className="relative overflow-hidden bg-neutral-900 rounded-sm py-12 px-8 md:py-20 md:px-16">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Section */}
          <div className="text-center lg:text-left space-y-4 max-w-xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#eb1c77] font-bold tracking-[0.4em] text-[10px] uppercase"
            >
              Stay in the loop
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter uppercase italic">
              Our emails are like <br />
              <span className="text-neutral-400 not-italic">our scrubs.</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-lg font-light tracking-wide">
              Join our community for exclusive early access, styling tips, and
              industrial insights.
            </p>
          </div>

          {/* Form Section */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full lg:w-auto group"
          >
            <div className="relative flex items-center border-b border-neutral-700 hover:border-[#eb1c77] transition-colors duration-500 pb-2">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="bg-transparent w-full md:w-[400px] py-4 outline-none text-white text-xs md:text-sm tracking-[0.2em] placeholder:text-neutral-600 placeholder:uppercase"
              />
              <button
                type="submit"
                className="text-white hover:text-[#eb1c77] transition-all duration-300 ml-4 group-hover:translate-x-2"
                aria-label="Subscribe"
              >
                <BsArrowRight size={28} />
              </button>
            </div>
            <p className="mt-4 text-[10px] text-neutral-500 uppercase tracking-widest text-center lg:text-left">
              By subscribing, you agree to our Privacy Policy
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
