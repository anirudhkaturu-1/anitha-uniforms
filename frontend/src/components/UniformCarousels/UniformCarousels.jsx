import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext";
import ProductItem from "../ProductItem/ProductItem";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UniformCarousels = () => {
  const { products } = useContext(ShopContext);
  const [grouped, setGrouped] = useState({});

  const uniformTypes = [
    { value: "hospital", label: "Hospital Uniforms" },
    { value: "school", label: "School Uniforms" },
    { value: "college", label: "College Uniforms" },
    { value: "corporate", label: "Corporate Uniforms" },
    { value: "industrial", label: "Industrial Uniforms" },
    { value: "custom", label: "Custom Uniforms" },
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
    <div className="py-16 space-y-24 bg-white">
      {uniformTypes.map(({ value, label }) => {
        const list = grouped[value];
        if (!list?.length) return null;

        // Take first 5 items
        const displayedItems = list.slice(0, 5);

        return (
          <section key={value} className="px-6 md:px-24">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div className="relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  className="h-[3px] bg-[#eb1c77] mb-4"
                />
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                  Collection — {list.length} Designs
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tighter mt-1 italic uppercase">
                  {label}
                </h2>
              </div>

              <Link
                to={`/collection?type=${value}`}
                className="group flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-400 hover:text-[#eb1c77] transition-colors"
              >
                EXPLORE ALL
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>

            {/* Product Grid / Carousel */}
            <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-6 pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
              {displayedItems.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="min-w-[70%] sm:min-w-[40%] md:min-w-0 snap-start"
                >
                  <ProductItem
                    id={product._id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    salePrice={product.salePrice}
                    color={product.color}
                  />
                </motion.div>
              ))}

              {/* "View More" Card for Mobile */}
              <div className="md:hidden min-w-[50%] flex items-center justify-center bg-neutral-50 rounded-sm border border-dashed border-neutral-200">
                <Link
                  to={`/collection?type=${value}`}
                  className="text-sm font-bold text-neutral-400 underline uppercase tracking-widest"
                >
                  View More
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default UniformCarousels;
