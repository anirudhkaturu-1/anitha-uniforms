import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Add backend API call here
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Contact Us</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-md p-2 outline-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md p-2 outline-blue-500"
            required
          />
        </div>

        {/* Number */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded-md p-2 outline-blue-500"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            className="w-full border border-gray-300 rounded-md p-2 outline-blue-500"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
