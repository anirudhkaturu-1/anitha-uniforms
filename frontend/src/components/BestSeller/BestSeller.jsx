import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import ProductItem from "../ProductItem/ProductItem";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProducts = products.filter((item) => item.bestseller === true);
      setBestSeller(bestProducts.slice(0, 5));
    }
  }, [products]);

  return (
    <section className="py-16 bg-white">
      {/* Section Title - Editorial Style */}
      <div className="px-6 md:px-24 mb-12">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#eb1c77] font-bold tracking-[0.4em] text-[10px] uppercase mb-2"
          >
            The Gold Standard
          </motion.span>

          <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 md:w-16 bg-neutral-200"></div>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter uppercase italic">
              Best Sellers
            </h2>
            <div className="h-[1px] w-8 md:w-16 bg-neutral-200"></div>
          </div>

          <p className="text-neutral-500 text-sm mt-4 max-w-md font-light">
            Our most trusted uniforms, chosen by industry leaders for their
            unmatched durability and style.
          </p>
        </div>
      </div>

      {/* Rendering products */}
      <div className="px-6 md:px-24">
        {bestSeller && bestSeller.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6 md:gap-8">
            {bestSeller.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  salePrice={item.salePrice}
                  color={item.color}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-24 border-y border-neutral-100">
            <div className="w-12 h-12 border-2 border-neutral-200 border-t-[#eb1c77] rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-400 text-xs font-bold tracking-widest uppercase">
              Curating Top Picks...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSeller;
