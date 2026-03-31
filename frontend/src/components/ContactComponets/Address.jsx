import React from "react";
import "./Address.css";

const Address = () => {
  return (
    <div className="w-full flex flex-col  items-center justify-center gap-10 mt-8 px-4 overflow-x-hidden">

      {/* Address / Contact Card */}
      <div className="card bg-blue-700 text-white p-6 rounded-xl w-full sm:w-[90%] md:w-[70%] lg:w-[40%] shadow-lg">
        <h2 className="text-2xl font-bold mb-3">Address</h2>

        <p className="text-base mb-2 leading-relaxed">
          7-8 Lanes, Main Road, Arundelpet,
          <br /> Guntur, Andhra Pradesh – 522002
        </p>

        <h3 className="text-lg font-semibold mt-4">Contact Info</h3>

        <p className="text-base mt-1">
          📞{" "}
          <a href="tel:+919490343375" className="underline">
            +91 94903 43375
          </a>
        </p>

        <p className="text-base mt-1">
          📧{" "}
          <a
            href="mailto:mafatlaluniformofficial@gmail.com"
            className="underline"
          >
            mafatlaluniformofficial@gmail.com
          </a>
        </p>
      </div>

      {/* Google Map */}
      <div className="w-full sm:w-[90%] md:w-[70%] mb-10 lg:w-[40%]">
        <iframe
          title="Mafatlal Uniforms Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.155173536963!2d80.438!3d16.3067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35ef3c06a6ad4f%3A0x3a2f15ac6f1f2d31!2sArundelpet%2C%20Guntur%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="320"
          allowFullScreen=""
          loading="lazy"
          className="rounded-xl shadow-lg"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Address;
