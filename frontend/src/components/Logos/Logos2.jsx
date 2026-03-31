import React from "react";
import './Logos.css';

const Logos2 = () => {
  const brandLogos = [
    { id: 1, img: "https://knyamed.com/cdn/shop/files/image_23_1.png?v=1756722785&width=500" },
    { id: 2, img: "https://knyamed.com/cdn/shop/files/image_22_2.png?v=1756722780&width=500" },
    { id: 3, img: "https://knyamed.com/cdn/shop/files/image_25_1.png?v=1756722784&width=500" },
    { id: 4, img: "https://www.podfeet.com/blog/wp-content/uploads/2021/11/Logos-Logo.png" },
    { id: 5, img: "https://denverseminary.edu/wp-content/uploads/2021/06/bookcover-logos-7.jpg" },
    { id: 6, img: "https://images.squarespace-cdn.com/content/v1/584d2924440243858695b1d0/1481452098432-F01Z6PRCUCOI61CWT36I/logos+logo.png" },
    { id: 7, img: "https://knyamed.com/cdn/shop/files/image_36_1.png?v=1756722784&width=500" },
  ];

  return (
    <div className="relative overflow-hidden z-20  py-8 ">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-56 bg-linear-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-56 bg-linear-to-l from-white to-transparent z-10" />

      <div className="flex items-center whitespace-nowrap animate-scroll">
        {brandLogos.concat(brandLogos).map((item, index) => (
          <img
            key={index}
            src={item.img}
            
            className="w-25 text-small sm:text-base md:text-xl font-semibold text-gray-700 mx-10 sm:mx-16 hover:text-[#eb1c77] transition-colors duration-300"
          >
          </img>
        ))}
      </div>
    </div>
  );
};

export default Logos2;
