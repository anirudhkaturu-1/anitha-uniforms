import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState(""); // New state for sale price
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [description, setDescription] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false); // Toggle for enabling/disabling discount

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    // Validation: salePrice should not be greater than price
    if (
      hasDiscount &&
      salePrice &&
      parseFloat(salePrice) >= parseFloat(price)
    ) {
      toast.error(
        "Sale price cannot be greater than or equal to original price",
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      // Only append salePrice if discount is enabled and salePrice has value
      if (hasDiscount && salePrice) {
        formData.append("salePrice", salePrice);
      }

      formData.append("sizes", JSON.stringify(sizes));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add-product",
        formData,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setPrice("");
        setSalePrice(""); // Reset sale price
        setSizes([]);
        setCategory("Men");
        setSubCategory("Topwear");
        setDescription("");
        setBestseller(false);
        setHasDiscount(false); // Reset discount toggle
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandle}
      className="flex flex-col w-full items-start gap-6 bg-white rounded-2xl p-6"
    >
      {/* Image Upload Section */}
      <div className="w-full">
        <p className="mb-2 text-xl font-semibold text-gray-700">
          Upload Images
        </p>
        <div className="flex gap-4 flex-wrap">
          <label
            htmlFor="image1"
            className="p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center w-24 h-24"
          >
            <div className="relative">
              {image1 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setImage1(false);
                  }}
                  className="absolute top-[-30px] right-[-30px] rounded-full bg-red-800 text-white text-lg"
                >
                  x
                </button>
              )}
              {image1 ? (
                <img
                  src={URL.createObjectURL(image1)}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaCloudUploadAlt size={24} className="text-gray-500" />
              )}
            </div>
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label
            htmlFor="image2"
            className="p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center w-24 h-24"
          >
            <div>
              {image2 ? (
                <img
                  src={URL.createObjectURL(image2)}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaCloudUploadAlt size={24} className="text-gray-500" />
              )}
            </div>
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label
            htmlFor="image3"
            className="p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center w-24 h-24"
          >
            <div>
              {image3 ? (
                <img
                  src={URL.createObjectURL(image3)}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaCloudUploadAlt size={24} className="text-gray-500" />
              )}
            </div>
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label
            htmlFor="image4"
            className="p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center w-24 h-24"
          >
            <div>
              {image4 ? (
                <img
                  src={URL.createObjectURL(image4)}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaCloudUploadAlt size={24} className="text-gray-500" />
              )}
            </div>
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="font-medium text-gray-700">Product Name</p>
        <input
          className="w-full max-w-[500px] border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="font-medium text-gray-700">Product Description</p>
        <textarea
          className="w-full max-w-[500px] border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Category Selection */}
      <div className="flex gap-8 flex-wrap">
        <div>
          <p className="font-medium text-gray-700">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="font-medium text-gray-700">Product Sub-Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>

      {/* Price Section with Sale Price */}
      <div className="w-full">
        <p className="font-medium text-gray-700">Original Price</p>
        <input
          className="w-full max-w-[500px] border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="number"
          step="0.01"
          placeholder="99.99"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      {/* Discount Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="hasDiscount"
          className="w-4 h-4"
          onChange={() => setHasDiscount((prev) => !prev)}
          checked={hasDiscount}
        />
        <label htmlFor="hasDiscount" className="text-gray-700 font-medium">
          Apply Discount / Sale Price
        </label>
      </div>

      {/* Sale Price Field - Only show when discount is enabled */}
      {hasDiscount && (
        <div className="w-full">
          <p className="font-medium text-gray-700">
            Sale Price (Discounted Price)
          </p>
          <input
            className="w-full max-w-[500px] border border-green-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="number"
            step="0.01"
            placeholder="79.99"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            required={hasDiscount}
          />
          <p className="text-sm text-gray-500 mt-1">
            Sale price must be less than original price
          </p>
        </div>
      )}

      {/* Sizes */}
      <div>
        <p className="font-medium text-gray-700 mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size],
                )
              }
              key={size}
              className={`border border-gray-300 px-4 py-2 rounded-md cursor-pointer transition ${sizes.includes(size) ? "bg-pink-400 border-pink-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              <p>{size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          className="w-4 h-4"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label htmlFor="bestseller" className="text-gray-700 font-medium">
          Add To Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-28 py-3 px-5 rounded-2xl font-bold text-white transition ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default Add;
