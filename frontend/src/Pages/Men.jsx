import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "../components/ProductItem/ProductItem";
import DynamicHeropage from "../components/DynamicHeropage/DynamicHeropage";

const Men = () => {
  const { products } = useContext(ShopContext);
  const [categoryMen, setCategoryMen] = useState([]);

  useEffect(() => {
    const menCategory = products.filter((item) => item.category === "Men");
    setCategoryMen(menCategory.slice(0, 50));
  }, [products]);

  return (
    <>
      <DynamicHeropage />

      {/* Section Title */}
      <div className="flex items-center px-10 py-12 md:px-20">
        <div className="mr-2 w-10 mt-3 h-1 bg-[#eb1c77] rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#eb1c77]">
          Men’s Collection
        </h2>
        <div className="ml-2 w-10 mt-3 h-1 bg-[#eb1c77] rounded-full"></div>
      </div>

      {/* Rendering Products */}
      {categoryMen && categoryMen.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 px-10 py-10 md:px-20 gap-5">
          {categoryMen.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg animate-pulse">
            Hey Dude, Men’s Collection coming soon...
          </p>
        </div>
      )}
    </>
  );
};

export default Men;
