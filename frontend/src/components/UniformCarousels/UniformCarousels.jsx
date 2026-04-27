import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext";
import ProductItem from "../ProductItem/ProductItem";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UniformCarousels = () => {
  const { products } = useContext(ShopContext);
  const [grouped, setGrouped] = useState({});

  const uniformTypes = [
    { value: "hospital", label: "Hospital", subtitle: "Medical Grade" },
    { value: "school", label: "School", subtitle: "Academic Wear" },
    { value: "corporate", label: "Corporate", subtitle: "Executive Wear" },
    { value: "industrial", label: "Industrial", subtitle: "Heavy Duty" },
    { value: "custom", label: "Custom", subtitle: "Bespoke" },
  ];

  useEffect(() => {
    const groupedMap = {};
    uniformTypes.forEach(({ value }) => {
      groupedMap[value] = products.filter((p) => p.uniformType === value);
    });
    setGrouped(groupedMap);
  }, [products]);

  const anyProducts = Object.values(grouped).some((arr) => arr.length > 0);
  if (!anyProducts) return null;

  return (
    <div className="py-20 space-y-32 bg-white">
      {uniformTypes.map(({ value, label, subtitle }) => {
        const list = grouped[value];
        if (!list?.length) return null;

        // Take exactly 4 items for a clean Bento Grid
        const bentoItems = list.slice(0, 4);

        return (
          <section key={value} className="px-6 md:px-24">
            {/* Editorial Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-[2px] bg-[#eb1c77]" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#eb1c77] font-bold">
                    {subtitle} — {list.length} Designs
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase italic leading-none">
                  {label}{" "}
                  <span className="text-neutral-200 not-italic">Series</span>
                </h2>
              </div>

              <Link
                to={`/collection?type=${value}`}
                className="group flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-400 hover:text-[#eb1c77] transition-all border-b border-transparent hover:border-[#eb1c77] pb-1"
              >
                EXPLORE ALL{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto">
              {bentoItems.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group ${
                    index === 0
                      ? "md:col-span-2 md:row-span-2" // Large Featured Tile
                      : "md:col-span-1 md:row-span-1" // Smaller Tiles
                  }`}
                >
                  <div className="h-full border border-neutral-100 rounded-sm overflow-hidden bg-neutral-50 transition-shadow hover:shadow-xl">
                    <ProductItem
                      id={product._id}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      salePrice={product.salePrice}
                      color={product.color}
                    />

                    {index === 0 && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-neutral-900 text-white text-[9px] font-bold px-3 py-1 tracking-widest uppercase shadow-lg">
                          Featured Choice
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Final Bento Tile (CTA) - Only visible if more than 4 items */}
              {list.length > 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="md:col-span-1 md:row-span-1 bg-neutral-950 flex flex-col items-center justify-center p-6 text-center group cursor-pointer rounded-sm"
                >
                  <Link
                    to={`/collection?type=${value}`}
                    className="flex flex-col items-center"
                  >
                    <p className="text-neutral-500 text-[9px] font-bold tracking-widest uppercase mb-2">
                      Discovery
                    </p>
                    <h4 className="text-white text-lg font-bold tracking-tight mb-4 uppercase italic">
                      +{list.length - 4} More Styles
                    </h4>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#eb1c77] group-hover:border-[#eb1c77] transition-all">
                      <span className="text-white">→</span>
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default UniformCarousels;
