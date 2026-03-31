import React from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaRupeeSign } from "react-icons/fa";

const List = ({ token }) => {
  const [products, setProducts] = React.useState([]);
  const [Loading, setLoading] = React.useState(false)
  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + "/api/product/list-product", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
    }
    finally {
      setLoading(false)
    }
  };

  // ✅ Remove Product
  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

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
        }
      );

      toast.success(response.data.message);
      fetchProducts();
    } catch (error) {
      console.error("Delete product error:", error);
      toast.error(error.response?.data?.message || "Failed to remove product");
    }
  };


  // ✅ useEffect for initial fetch
  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Products</h2>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_2fr_1fr_1fr] items-center bg-gray-100 py-3 px-4 text-gray-700 font-semibold rounded-md shadow-sm">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span className="flex items-center gap-1 justify-start">
          <FaRupeeSign className="text-gray-600" /> Price
        </span>
        <span className="text-center">Actions</span>
      </div>

      {/* Product List */}

      <div className="flex flex-col gap-3 mt-3">
        {Loading ? <div className="flex items-center justify-center min-h-[50vh] 0">
          <div className="flex flex-col items-center">

            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-900"></div>
            <p className="mt-4 text-base font-medium text-violet-950 animate-pulse"> Loading...</p>
          </div>



        </div> : products.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No products found.</p>
        ) : (
          products.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_2fr_1fr_1fr] items-center bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
              </div>

              {/* Name */}
              <p className="font-medium text-gray-800 truncate">{item.name}</p>

              {/* Category */}
              <p className="text-gray-600">{item.category}</p>

              {/* Price */}
              <p className="flex items-center gap-1 text-gray-700 font-semibold">
                <FaRupeeSign className="text-gray-600" />
                {item.price}.00
              </p>

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
  );
};

export default List;
