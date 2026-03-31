import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import ProductItem from "../ProductItem/ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller === true);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <>
      {/* Section Title */}
      <div className="flex items-center px-10 py-12 md:px-20">
        <div className="mr-2 w-10 mt-3 h-1 bg-[#eb1c77] rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#eb1c77]">
          Best Seller
        </h2>
        <div className="ml-2 w-10 mt-3 h-1 bg-[#eb1c77] rounded-full"></div>
      </div>

      {/* Rendering products */}
      {bestSeller && bestSeller.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 px-10 py-10 md:px-20 gap-5">
          {bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              color={item.color}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg animate-pulse">
            Hey Dude, Best Sellers coming soon...
          </p>
        </div>
      )}
    </>
  );
};

export default BestSeller;
