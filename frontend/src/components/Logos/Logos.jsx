import React from "react";
import './Logos.css';

const Logos = () => {
  const brandLogos = [
    { id: 1, title: "Apple" },
    { id: 2, title: "Google" },
    { id: 3, title: "Microsoft" },
    { id: 4, title: "Amazon" },
    { id: 5, title: "Facebook" },
    { id: 6, title: "Netflix" },
    { id: 7, title: "Tesla" },
  ];

  return (
    <div className="relative overflow-hidden z-20  py-8 ">
    <div className="w-full  h-3 bg-[#d4e167] relative top-5 -z-2"></div>
      {/* <div className="pointer-events-none absolute left-0 top-0 h-full w-56 bg-linear-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-56 bg-linear-to-l from-white to-transparent z-10" /> */}

      <div className="flex items-center whitespace-nowrap animate-scroll">
        {brandLogos.concat(brandLogos).map((item, index) => (
          <h2
            key={index}
            className="text-small sm:text-base md:text-xl font-semibold text-gray-700 mx-10 sm:mx-16 hover:text-[#eb1c77] transition-colors duration-300"
          >
            {item.title}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default Logos;
