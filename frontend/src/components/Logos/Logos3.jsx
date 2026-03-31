import React from "react";
import "./Logos.css";
import Read from "../Readmore/Read"
const Logos3 = () => {
  const brandLogos = [
    { id: 1, img: "https://img.freepik.com/free-vector/flat-design-testimonial-template_23-2149376219.jpg" },
    { id: 2, img: "https://img.freepik.com/free-vector/flat-design-testimonial-background_23-2149387964.jpg" },
    { id: 3, img: "https://img.freepik.com/free-vector/flat-design-testimonial-background-template_23-2149376220.jpg" },
    { id: 4, img: "https://img.freepik.com/free-vector/flat-design-testimonial-template-with-photo_23-2149388045.jpg" },
    { id: 5, img: "https://img.freepik.com/free-vector/flat-design-testimonial-banner-template_23-2149388052.jpg" },
    { id: 6, img: "https://img.freepik.com/free-vector/flat-design-testimonial-banner_23-2149387962.jpg" },
    { id: 7, img: "https://img.freepik.com/free-vector/flat-design-testimonial-template-with-photo_23-2149376221.jpg" },
  ];

  return (
    <>
    <div className="relative overflow-hidden  bg-white">
      <div className="flex items-center whitespace-nowrap animate-scrolls">
        {brandLogos.concat(brandLogos).map((item, index) => (
          <img
            key={index}
            src={item.img}
            alt="testimonial"
            className=" w-[380px] h-[300px] object-cover  "
            />
        ))}
      </div>
    </div>
    <Read/>
      </>
  );
};

export default Logos3;
