import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { BsStar } from 'react-icons/bs';
import { FaCheckCircle, FaMoneyBillWave, FaExchangeAlt } from "react-icons/fa";
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';


const Product = () => {
  const { id } = useParams();
  const { products, currency, addToCart,error } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [size, setSize] = useState(null);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);



  const fetchProductData = () => {
    const product = products.find((item) => item._id === id);
    if (product) {
      setProductData(product);
      setSelectedImage(product.image[0]);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      fetchProductData();
    }
  }, [id, products]);


  const toggleOpen = () => {
    setOpen(!open);
  }

  // WhatsApp order link
  const whatsappMessage = `Hi, I want to order ${productData?.name} in size ${size || 'N/A'}.`;
  const whatsappLink = `https://wa.me/9849180401?text=${encodeURIComponent(whatsappMessage)}`;

  return productData ? (
    <div className='border-top pt-10 px-5 md:px-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* productData */}
      <div className='flex flex-col sm:gap-12 sm:flex-row'>
        {/* productImages */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-3 justify-between sm:justify-normal sm:w-[16.5%] w-full'>
            {
              productData.image.map((item, index) => (
                <img src={item} onClick={() => setSelectedImage(item)} alt="item" key={index} className='w-[24%] sm:w-full cursor-pointer ' />
              ))
            }
          </div>
          <div className='w-full sm:w-[75%]'>
            <img src={selectedImage} alt="" className='w-full  object-contain' />
          </div>
        </div>

        {/* product info */}
        <div className='flex-1'>
          <h2 className='font-medium mt-2 text-2xl'>{productData.name}</h2>
          <div className='flex items-center gap-1 mt-2'>
            {Array(productData.rating || 5)
              .fill()
              .map((_, index) => (
                <span key={index} className='text-amber-400'>
                  <BsStar />
                </span>
              ))}
          </div>

          <p className='font-semibold text-2xl mt-5'>{currency} <span>{productData.price} <span>-/- </span> </span> </p>

          <p className='mt-5 md:w-4/5 font-medium '>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p className='text-base capitalize'>Select-Sizes -:</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={` bg-violet-300 border border-violet-400 px-4 py-2 ${item === size ? 'bg-violet-600 text-white' : ''} cursor-pointer  text-sm`}>{item}</button>
                ))
              }
            </div>
          </div>
          

          <div className='flex gap-6'>
             
            <button onClick={()=>addToCart(productData._id,size)} className='bg-violet-600 text-white px-4 py-2 rounded-md'>Add To Cart</button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 cursor-pointer bg-green-700 text-white py-2  rounded-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fill-rule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clip-rule="evenodd"></path>
              </svg>                Order Now
            </a>
          </div>
          <hr className='mt-8 sm:w-4/5 text-gray-300' />
          <div className='text-sm text-violet-700 mt-5 flex flex-col gap-2'>
            <p className='flex items-center gap-2'>
              <FaCheckCircle className='text-green-500 text-base' />
              100% Original Product
            </p>
            <p className='flex items-center gap-2'>
              <FaMoneyBillWave className='text-green-500 text-base' />
              Cash on Delivery Available
            </p>
            <p className='flex items-center gap-2'>
              <FaExchangeAlt className='text-green-500 text-base' />
              Easy 7 Days Returns and Exchanges
            </p>
          </div>
          <div onClick={toggleOpen}>
            <h2 className='text-xl font-medium mt-5'>Details & Fit +</h2>
            <hr className='mt-2 sm:w-4/5 text-gray-300' />
            {
              open && (
                <p>Engineered for the demands of a 12-hour shift, our Classic New Gen Scrub Top provides exceptional comfort and a professional, structured fit that’s never baggy or boxy.


                  Designed for Your Demanding Shifts We know that comfort and function are non-negotiable. That's why we crafted this top with our proprietary poly-viscose fabric, offering the perfect balance of long-lasting durability and soft, breathable comfort. It’s an affordable, easy-care scrub top designed to meet the needs of female doctors and nurses in Indian hospitals and clinics.


                  Smart, Functional, and Professional

                  Three Roomy Pockets: Keep your pens, phone, and other essentials organized and within reach with two lower pockets and one chest pocket.

                  Convenient ID Badge Loop: A dedicated loop on the shoulder keeps your ID secure and visible without damaging your scrubs.

                  Tailored for a Flattering Fit: Featuring structured back darts, this top offers a modern silhouette that avoids the shapeless look of traditional scrubs.

                  Freedom of Movement: Side slits provide extra room and flexibility, allowing you to move, bend, and stretch freely throughout your day.</p>
              )
            }

          </div>
        </div>
      </div>

      <div className='mt-20'>
        <b className='border px-5 py-3 text-base'>Description</b>
        <div className='flex flex-col gap-4 mt-3 text-gray-600 md:w-7xl border px-5 py-3'>
          <p className='text-sm'>Three Roomy Pockets: Keep your pens, phone, and other essentials organized and within reach with two lower pockets and one chest pocket.
            Convenient ID Badge Loop: A dedicated loop on the shoulder keeps your ID secure and visible without damaging your scrubs.
          </p>
          <p className='text-sm'>Tailored for a Flattering Fit: Featuring structured back darts, this top offers a modern silhouette that avoids the shapeless look of traditional scrubs.
            Freedom of Movement: Side slits provide extra room and flexibility, allowing you to move, bend, and stretch freely throughout your day.
          </p>
        </div>
      </div>
      {/* Related Products */}
       <RelatedProducts category={products.category} subCategory={products.subCategory}/>
    </div>

  ) : (
    <p>Loading...</p>
  );
};

export default Product;
