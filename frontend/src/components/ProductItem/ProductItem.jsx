import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, salePrice, color }) => {
  // Helper function to check if product has valid sale price
  const hasValidSalePrice = () => {
    return salePrice && salePrice !== null && salePrice < price;
  };

  // Helper function to calculate discount percentage
  const getDiscountPercent = () => {
    if (!hasValidSalePrice()) return null;
    const discount = ((price - salePrice) / price) * 100;
    return Math.round(discount);
  };

  // Format price to 2 decimal places
  const formatPrice = (priceValue) => {
    return parseFloat(priceValue).toFixed(2);
  };

  const isOnSale = hasValidSalePrice();
  const discountPercent = getDiscountPercent();

  return (
    <Link to={`/product/${id}`}>
      <div className="relative">
        {/* Sale Badge */}
        {isOnSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded z-10">
            SALE
          </span>
        )}

        <div className="flex items-center justify-center overflow-hidden cursor-pointer">
          <img
            src={image[0]}
            alt=""
            className="hover:scale-110 transition ease-in-out"
          />
        </div>
      </div>

      <div className="flex flex-col justify-start items-start">
        <h2 className="py-2 pb-1 text-sm font-normal">{name}</h2>

        {/* Price Section with Slash Effect */}
        <div className="flex flex-col items-start space-y-0.5">
          {isOnSale ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-red-600 font-medium text-sm">
                  ₹{formatPrice(salePrice)}
                </span>
                {discountPercent && (
                  <span className="text-green-600 text-xs font-medium">
                    ({discountPercent}% off)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400 line-through text-xs">
                  ₹{formatPrice(price)}
                </span>
              </div>
            </>
          ) : (
            <h3 className="text-sm font-medium">₹{formatPrice(price)}</h3>
          )}
        </div>

        <p className="text-xs text-gray-700 mt-1.5 flex items-center gap-2">
          Color:
          <span
            className="w-3.5 h-3.5 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          ></span>
          <span className="capitalize text-gray-600">{color}</span>
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
