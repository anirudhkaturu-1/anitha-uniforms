import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [uniformType, setUniformType] = useState("custom");
  const [description, setDescription] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false);

  // State to track the last clicked index for Shift-Click functionality
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

  // Generate numeric range 20 to 50
  const numericRange = Array.from({ length: 31 }, (_, i) => i + 20);

  const toggleSize = (e, size, index) => {
    // If Shift key is held and there's a previously clicked item
    if (e.shiftKey && lastSelectedIndex !== null) {
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);

      // Get all numbers in the visual range from the numericRange array
      const rangeSelection = numericRange.slice(start, end + 1);

      // Merge new range with previous selections and remove duplicates
      setSizes((prev) => Array.from(new Set([...prev, ...rangeSelection])));
    } else {
      // Normal toggle behavior
      setSizes((prev) =>
        prev.includes(size)
          ? prev.filter((item) => item !== size)
          : [...prev, size],
      );
    }
    // Update the anchor point for the next shift-click
    setLastSelectedIndex(index);
  };

  const selectAllSizes = () => setSizes(numericRange);
  const clearAllSizes = () => {
    setSizes([]);
    setLastSelectedIndex(null);
  };

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    if (sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    if (
      hasDiscount &&
      salePrice &&
      parseFloat(salePrice) >= parseFloat(price)
    ) {
      toast.error("Sale price must be lower than original price");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      if (hasDiscount) formData.append("salePrice", salePrice);

      // Send sizes as a clean array of numbers
      formData.append("sizes", JSON.stringify(sizes));

      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("uniformType", uniformType);
      formData.append("bestseller", bestseller);

      images.forEach((img, i) => {
        if (img) formData.append(`image${i + 1}`, img);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add-product`,
        formData,
        { headers: { authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        // Reset Logic
        setName("");
        setPrice("");
        setSalePrice("");
        setSizes([]);
        setImages([null, null, null, null]);
        setHasDiscount(false);
        setLastSelectedIndex(null);
        setDescription("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandle}
      className="flex flex-col w-full max-w-4xl gap-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-500">
          Fill in the details to list a new uniform item.
        </p>
      </div>

      {/* Image Upload Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <label
            key={index}
            className="group relative flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all overflow-hidden"
          >
            {img ? (
              <img
                src={URL.createObjectURL(img)}
                className="absolute inset-0 w-full h-full object-cover"
                alt="preview"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-500">
                <FaCloudUploadAlt size={28} />
                <span className="text-xs mt-2">Upload</span>
              </div>
            )}
            <input
              type="file"
              hidden
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
          </label>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Product Name
            </label>
            <input
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              className="w-full mt-1 px-4 py-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-400 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Pricing & Category */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Price
              </label>
              <input
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Sale Price
              </label>
              <input
                disabled={!hasDiscount}
                className={`w-full mt-1 px-4 py-2 border rounded-lg outline-none transition ${
                  hasDiscount
                    ? "bg-white focus:ring-2 focus:ring-green-400"
                    : "bg-gray-50"
                }`}
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="disc"
              checked={hasDiscount}
              onChange={() => setHasDiscount(!hasDiscount)}
              className="w-4 h-4 accent-blue-600"
            />
            <label htmlFor="disc" className="text-sm font-medium text-gray-600">
              Enable sale price
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <select
              className="px-3 py-2 border rounded-lg bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
            <select
              className="px-3 py-2 border rounded-lg bg-white"
              value={uniformType}
              onChange={(e) => setUniformType(e.target.value)}
            >
              <option value="school">School</option>
              <option value="hospital">Hospital</option>
              <option value="college">College</option>
              <option value="corporate">Corporate</option>
              <option value="industrial">Industrial</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
      </div>

      {/* SIZE SELECTION WITH RANGE SELECTION */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-gray-800">Available Sizes</h3>
            <p className="text-xs text-gray-500">
              Hold <span className="font-bold text-blue-600">Shift</span> to
              select a range
            </p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={selectAllSizes}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              SELECT ALL
            </button>
            <button
              type="button"
              onClick={clearAllSizes}
              className="text-xs font-bold text-red-500 hover:underline"
            >
              CLEAR
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {numericRange.map((size, index) => (
            <button
              key={size}
              type="button"
              onClick={(e) => toggleSize(e, size, index)}
              className={`py-2 text-sm font-bold rounded-lg border select-none transition-all duration-200 ${
                sizes.includes(size)
                  ? "bg-blue-600 border-blue-600 text-white shadow-md scale-105"
                  : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="best"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
            className="w-4 h-4 accent-blue-600"
          />
          <label htmlFor="best" className="text-sm font-semibold text-gray-700">
            Mark as Bestseller
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
        }`}
      >
        {loading ? "Processing..." : "Create Product Listing"}
      </button>
    </form>
  );
};

export default Add;
