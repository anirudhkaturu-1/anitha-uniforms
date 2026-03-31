import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        id: 1,
        title: "Discover Your Perfect Style",
        desc: "Explore the latest trends for men and women. Upgrade your wardrobe now.",
        btnText: "Shop Now",
        img: "https://images.unsplash.com/photo-1520975918311-59c6b3f2e43b?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 2,
        title: "Summer Collection 2025",
        desc: "Bright colors, bold patterns — get ready for the season in style.",
        btnText: "Explore Collection",
        img: "https://images.unsplash.com/photo-1520971341018-3e5e9e8e16c5?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 3,
        title: "Exclusive Offers Just for You",
        desc: "Get up to 50% off on your favorite items. Limited time only!",
        btnText: "Grab Offer",
        img: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?auto=format&fit=crop&w=900&q=80",
    },
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-[80vh] overflow-hidden">
            <AnimatePresence>
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <img
                        src={slides[current].img}
                        alt={slides[current].title}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* Text Content */}
                    <div className="absolute top-1/2 left-10 md:left-24 transform -translate-y-1/2 text-white max-w-xl">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold mb-4"
                        >
                            {slides[current].title}
                        </motion.h1>

                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-lg md:text-xl mb-6 text-gray-200"
                        >
                            {slides[current].desc}
                        </motion.p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="px-8 py-3 bg-[#eb1c77] text-white font-semibold rounded-full shadow-md hover:bg-[#ff5fa2] transition-all duration-300"
                        >
                            {slides[current].btnText}
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? "bg-[#eb1c77]" : "bg-white/50"
                            }`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
