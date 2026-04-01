import React from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaRupeeSign } from "react-icons/fa";

const List = ({ token }) => {
  const [products, setProducts] = React.useState([]);
  const [Loading, setLoading] = React.useState(false);

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        backendUrl + "/api/product/list-product",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove Product
  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    const token = localStorage.getItem("token"); // ✅ ensure token is fetched properly

    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }

    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/remove-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.message);
      fetchProducts();
    } catch (error) {
      console.error("Delete product error:", error);
      toast.error(error.response?.data?.message || "Failed to remove product");
    }
  };

  // ✅ Format price with 2 decimal places
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  // ✅ Check if product has sale price and it's valid
  const hasValidSalePrice = (product) => {
    return (
      product.salePrice &&
      product.salePrice !== null &&
      product.salePrice < product.price
    );
  };

  // ✅ Calculate discount percentage
  const getDiscountPercent = (product) => {
    if (!hasValidSalePrice(product)) return null;
    const discount =
      ((product.price - product.salePrice) / product.price) * 100;
    return Math.round(discount);
  };

  // ✅ Price Display Component
  const PriceDisplay = ({ product }) => {
    const hasDiscount = hasValidSalePrice(product);
    const discountPercent = getDiscountPercent(product);

    if (hasDiscount) {
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <FaRupeeSign className="text-gray-600 text-sm" />
            <span className="text-red-600 font-bold text-lg">
              {formatPrice(product.salePrice)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaRupeeSign className="text-gray-400 text-xs" />
            <span className="text-gray-400 line-through text-sm">
              {formatPrice(product.price)}
            </span>
            {discountPercent && (
              <span className="ml-1 text-green-600 text-xs font-semibold">
                ({discountPercent}% off)
              </span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1">
        <FaRupeeSign className="text-gray-700" />
        <span className="text-gray-700 font-semibold">
          {formatPrice(product.price)}
        </span>
      </div>
    );
  };

  // ✅ Badge Component for Sale
  const SaleBadge = ({ product }) => {
    if (!hasValidSalePrice(product)) return null;

    return (
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
        SALE
      </span>
    );
  };

  // ✅ Mobile Card View (for smaller screens)
  const MobileProductCard = ({ product }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-3 relative">
        <SaleBadge product={product} />
        <div className="flex gap-4">
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-md border"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <PriceDisplay product={product} />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md text-sm transition-all duration-200"
            onClick={() => removeProduct(product._id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  // ✅ useEffect for initial fetch
  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        All Products
      </h2>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_3fr_2fr_1.5fr_1fr] items-center bg-gray-100 py-3 px-4 text-gray-700 font-semibold rounded-md shadow-sm">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span className="flex items-center gap-1">
            <FaRupeeSign className="text-gray-600" /> Price
          </span>
          <span className="text-center">Actions</span>
        </div>

        {/* Product List - Desktop */}
        <div className="flex flex-col gap-3 mt-3">
          {Loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-900"></div>
                <p className="mt-4 text-base font-medium text-violet-950 animate-pulse">
                  Loading...
                </p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No products found.
            </p>
          ) : (
            products.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_3fr_2fr_1.5fr_1fr] items-center bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-all duration-200 relative"
              >
                {/* Image with Sale Badge */}
                <div className="relative flex justify-center">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <SaleBadge product={item} />
                </div>

                {/* Name */}
                <p className="font-medium text-gray-800 truncate">
                  {item.name}
                </p>

                {/* Category */}
                <p className="text-gray-600">{item.category}</p>

                {/* Price - With Slash Effect */}
                <PriceDisplay product={item} />

                {/* Actions */}
                <div className="text-center">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm transition-all duration-200"
                    onClick={() => removeProduct(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="md:hidden">
        {Loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-900"></div>
              <p className="mt-4 text-base font-medium text-violet-950 animate-pulse">
                Loading...
              </p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No products found.</p>
        ) : (
          products.map((item) => (
            <MobileProductCard key={item._id} product={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default List;
