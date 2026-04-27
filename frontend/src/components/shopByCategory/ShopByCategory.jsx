import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ShopByCategory = () => {
  const categories = [
    {
      id: 1,
      path: "/women",
      label: "Women",
      subtitle: "Corporate",
      className: "md:col-span-1 md:row-span-2",
      image:
        "https://images.unsplash.com/photo-1774600166432-ba8ac640b318?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      path: "/men",
      label: "Men",
      subtitle: "Executive",
      className: "md:col-span-1 md:row-span-1",
      image:
        "https://images.unsplash.com/photo-1622253694238-3b22139576c6?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      path: "/child",
      label: "Kids",
      subtitle: "School Wear",
      className: "md:col-span-1 md:row-span-1",
      image:
        "https://images.unsplash.com/photo-1591219233007-4ac041f8c2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      path: "/bulk",
      label: "Bulk",
      subtitle: "Workwear",
      className: "md:col-span-2 md:row-span-1", // Wide banner for industrial
      image:
        "https://images.unsplash.com/photo-1609143739217-01b60dad1c67?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section className="px-6 py-12 md:px-24 bg-neutral-50">
      {/* Refined Section Header */}
      <div className="flex items-baseline justify-between mb-8 border-l-4 border-pink-600 pl-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            Shop By Category
          </h2>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">
            Professional Attire for Every Sector
          </p>
        </div>
        <Link
          to="/shop"
          className="text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors tracking-tighter"
        >
          VIEW ALL →
        </Link>
      </div>

      {/* Compact Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 h-auto md:h-[500px]">
        {categories.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`relative group overflow-hidden bg-neutral-200 ${item.className}`}
          >
            {/* Image Layer */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-75"
              />
            </motion.div>

            {/* Minimalist Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>

            {/* Text Overlay */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="text-pink-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {item.subtitle}
              </span>
              <h3 className="text-white text-xl font-bold tracking-tight">
                {item.label}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
