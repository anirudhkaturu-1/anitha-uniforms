import React, { useState } from "react";

const ReadMore = () => {

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show)
  }


  return (

    <div className="bg-white">
      <div className="py-10 px-10 flex flex-col gap-5">

          <div>

              <h2 className="text-pink-600 font-medium md:text-3xl text-2xl">
                Stylish & Functional Medical Scrubs, Lab Coats, and Stethoscopes for Men & Women!
              </h2>

              <span className="text-pink-600 ">Introduction:</span>

              <h3 className="text-slate-600 ">
                Anitha is your one-stop shop for top-quality medical scrubs, lab coats, and underscrubs
                for men and women. We believe every medical professional deserves comfortable, flexible,
                and breathable apparel that also projects a highly professional image.
              </h3>
            </div>

        {
          show && (
          
            <div className="text-gray-700 leading-relaxed space-y-4">
              <h3 className="font-bold text-pink-600 mt-4">Medical Scrub Suits for Men and Women</h3>
              <p>
                Experience the perfect blend of functionality and fashion with our medical scrub suits.
                Crafted from a premium polyester-viscose blend, our scrubs offer superior comfort and practicality.
              </p>

              <h4 className="font-semibold">Types of Scrubs:</h4>
              <ul className="list-disc ml-6">
                <li>V-neck Scrubs – Modern and stylish.</li>
                <li>Mandarin Collar Scrubs – Sophisticated professional look.</li>
                <li>Full-Sleeve Scrubs – Superior protection.</li>
                <li>Short-Sleeve Scrubs – Breathable and cool.</li>
              </ul>

              <h3 className="font-bold text-pink-600 mt-4">Lab Coat Aprons for Men and Women</h3>
              <p>
                Our lab coat aprons combine functionality and elegance. Made from durable, high-quality polyester for long-lasting wear.
              </p>

              <h4 className="font-semibold">Types of Lab Coats:</h4>
              <ul className="list-disc ml-6">
                <li>Chief Lab Coat – Command attention.</li>
                <li>Focus Lab Coat – Versatile and sleek.</li>
                <li>Everyday Lab Coat – Comfortable for daily use.</li>
              </ul>

              <h3 className="font-bold text-pink-600 mt-4">Underscrubs for Men and Women</h3>
              <p>
                Discover the ultimate comfort with Knya's Pima cotton underscrubs. Prioritize your well-being while staying stylish.
              </p>

              <ul className="list-disc ml-6">
                <li>Long-Sleeve – Warm and breathable (Grey & White).</li>
                <li>Short-Sleeve – Cool and lightweight (Grey & White).</li>
              </ul>

              <h3 className="font-bold text-pink-600 mt-4">Ecoflex Scrubs</h3>
              <p>
                Sustainable scrubs made from PET bottles with 4-way stretch and reduced carbon footprint.
              </p>

              <h3 className="font-bold text-pink-600 mt-4">Surgical Caps</h3>
              <ul className="list-disc ml-6">
                <li>Designer Caps – Camouflage, Smiley, Evil Eye prints.</li>
                <li>Plain Caps – Simple and elegant.</li>
              </ul>

              <h3 className="font-bold text-pink-600 mt-4">Knya’s 6sense Stethoscope</h3>
              <p>
                A reliable diagnostic tool complementing our professional medical wear collection.
              </p>

              <h3 className="font-bold text-pink-600 mt-4">Frequently Asked Questions</h3>
              <ul className="list-disc ml-6">
                <li>Check our size chart for accurate fits.</li>
                <li>Our sustainable scrubs are as durable as traditional ones.</li>
                <li>You can mix and match underscrubs freely.</li>
                <li>Customization available for bulk orders.</li>
                <li>Easy returns within our policy period.</li>
                <li>Scrub caps designed for long comfort.</li>
                <li>Samples available before bulk purchase.</li>
                <li>Perfect for all healthcare professions.</li>
              </ul>
            </div>
          )
        }



        <div className="flex justify-start">
          <button
            onClick={toggleShow}
            className="border cursor-pointer px-6 py-2 border-pink-500 text-pink-600 hover:bg-pink-600 hover:text-white transition duration-300 rounded-md"
          >
            {show ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
