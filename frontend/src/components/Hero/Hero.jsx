import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const slides = [
    // {
    //   id: 1,
    //   subtitle: "Executive Wear",
    //   title: "Premium Corporate Uniforms",
    //   desc: "Redefine professionalism with tailored corporate uniforms crafted for comfort, durability, and elegance.",
    //   btnText: "Explore Collection",
    //   img: "https://plus.unsplash.com/premium_photo-1671469876887-b2733ac9c785?auto=format&fit=crop&q=80&w=1600",
    // },
    {
      id: 2,
      subtitle: "Academic Excellence",
      title: "Stylish School Uniforms",
      desc: "From preschool to high school — discover perfectly stitched, high-quality school uniforms for every student.",
      btnText: "Shop School Wear",
      img: "https://images.unsplash.com/photo-1759143102544-790af882ff45?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      subtitle: "Heavy Duty",
      title: "Smart Industrial & Workwear",
      desc: "Safety meets comfort. Get durable and functional uniforms for your workforce with customized branding options.",
      btnText: "Get a Quote",
      img: "https://plus.unsplash.com/premium_photo-1661349659049-1f8f462ae66d?q=80&w=2137&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[90vh] md:h-screen min-h-[600px] overflow-hidden bg-neutral-950">
      <AnimatePresence mode="wait">
        <motion.div key={current} className="relative w-full h-full">
          {/* Cinematic Background Image Container */}
          <motion.div
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute inset-0 z-0"
          >
            <img
              src={slides[current].img}
              alt={slides[current].title}
              className="w-full h-full object-cover"
            />
            {/* Multi-layered Overlay for depth and legibility */}
            <div className="absolute inset-0 bg-black/40 shadow-inner"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-900/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent"></div>
          </motion.div>

          {/* Main Content Area */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-24">
            <div className="max-w-4xl pt-12 md:pt-0">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-block text-pink-500 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-5"
              >
                {slides[current].subtitle}
              </motion.span>

              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight"
                >
                  {slides[current].title}
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-base md:text-lg lg:text-xl text-neutral-300 mb-10 max-w-xl font-normal leading-relaxed"
              >
                {slides[current].desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#ff1e85" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 md:px-10 py-4 bg-[#eb1c77] text-white font-bold rounded-sm tracking-widest uppercase text-[10px] md:text-xs shadow-xl transition-all"
                >
                  {slides[current].btnText}
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 md:px-10 py-4 border border-white/20 text-white font-bold rounded-sm tracking-widest uppercase text-[10px] md:text-xs backdrop-blur-md transition-all"
                >
                  View Details
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute bottom-12 left-6 md:left-24 right-6 flex items-end justify-start gap-8 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="group relative flex flex-col items-start gap-3 transition-opacity hover:opacity-100"
            style={{ opacity: current === index ? 1 : 0.5 }}
          >
            <span className="text-[10px] md:text-xs font-mono font-bold text-white tracking-tighter">
              0{index + 1}
            </span>
            <div className="relative w-16 md:w-32 h-[3px] bg-white/10 rounded-full overflow-hidden">
              {current === index && (
                <motion.div
                  layoutId="activeBar"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="absolute inset-0 bg-pink-600 shadow-[0_0_10px_#db2777]"
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
