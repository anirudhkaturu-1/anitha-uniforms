import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BulkOrder = () => {
  return (
    <section className="relative px-6 py-12 md:px-24 md:py-20">
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-3xl group">
        {/* Cinematic Background with Zoom Effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1600"
            alt="Corporate Teams"
            className="w-full h-full object-cover brightness-[0.7] group-hover:scale-105 transition-transform duration-1000"
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-8"
          >
            {/* Trust Badge */}
            <div className="inline-block px-4 py-1.5 border border-white/30 backdrop-blur-md bg-white/10 rounded-full mb-4">
              <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
                Trusted by 1000+ Enterprises
              </span>
            </div>

            <h2 className="text-3xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase italic drop-shadow-2xl">
              Equipping global teams <br className="hidden md:block" />
              <span className="text-pink-500 not-italic">
                for the next level.
              </span>
            </h2>

            <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
              From logistics to corporate HQ—we streamline your organization’s
              apparel with premium quality and seamless delivery.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pt-4"
            >
              <Link to="/bulk">
                <button className="px-12 py-4 bg-[#eb1c77] text-white font-black tracking-[0.2em] uppercase text-xs rounded-sm shadow-[0_10px_30px_rgba(235,28,119,0.4)] hover:bg-[#ff1e85] transition-all">
                  Inquire Bulk Order
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Stat Decor (Optional) */}
        <div className="absolute bottom-10 right-10 hidden lg:block">
          <div className="flex flex-col items-end">
            <span className="text-white text-5xl font-black italic">99%</span>
            <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest leading-none">
              On-Time Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkOrder;
