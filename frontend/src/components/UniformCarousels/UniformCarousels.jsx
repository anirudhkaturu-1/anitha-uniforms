import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext";
import ProductItem from "../ProductItem/ProductItem";

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
    <div className="space-y-12">
      {uniformTypes.map(({ value, label }) => {
        const list = grouped[value];
        if (!list?.length) return null;

        // Take first 5 items
        const displayedItems = list.slice(0, 5);

        return (
          <div key={value} className="px-10 md:px-20">
            {/* Decorative title (same style as main "Collections" heading) */}
            <div className="flex items-center mb-6">
              <div className="mr-2 w-10 mt-3 h-1 bg-[#eb1c77] rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#eb1c77]">
                {label}
              </h2>
              <div className="ml-2 w-10 mt-3 h-1 bg-[#eb1c77] rounded-full"></div>
            </div>

            {/* Optional: item count badge */}
            <div className="text-right mb-2 text-sm text-gray-500">
              {list.length} {list.length === 1 ? "item" : "items"} available
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-5">
              {displayedItems.map((product) => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  salePrice={product.salePrice}
                  color={product.color}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UniformCarousels;
