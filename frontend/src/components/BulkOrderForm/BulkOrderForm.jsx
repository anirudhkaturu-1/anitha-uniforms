import React, { useState } from "react";

const BulkOrderForm = () => {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bulk Order Form Data:", formData);

    // Add API call logic here 
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-10">

      <h2 className="text-2xl font-bold text-center mb-4">
        Bulk Uniform Order Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Company / School */}
        <div>
          <label className="font-medium text-gray-700">Company / School Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter organization name"
            className="w-full border p-2 rounded-md outline-blue-500"
            required
          />
        </div>

        {/* Contact Person Name */}
        <div>
          <label className="font-medium text-gray-700">Contact Person Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full border p-2 rounded-md outline-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full border p-2 rounded-md outline-blue-500"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border p-2 rounded-md outline-blue-500"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="font-medium text-gray-700">Required Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 50, 100, 500"
            className="w-full border p-2 rounded-md outline-blue-500"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="font-medium text-gray-700">Message / Requirements</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter details such as sizes, colors, delivery date..."
            className="w-full border p-2 rounded-md outline-blue-500"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
        >
          Submit Bulk Order
        </button>
      </form>
    </div>
  );
};

export default BulkOrderForm;
