import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import ProductItem from '../ProductItem/ProductItem';

const Collections = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <>
      {/* Section Title */}
      <div className='flex items-center px-10 py-10 md:px-20'>
        <div className="mr-2 w-10 mt-3 h-1 bg-[#eb1c77] rounded-full"></div>
        <h2 className='text-2xl md:text-3xl font-semibold text-[#eb1c77]'>Collections</h2>
        <div className="ml-2 w-10 mt-3 h-1 bg-[#eb1c77] rounded-full"></div>
      </div>

      {/* Rendering Products */}
      {latestProducts && latestProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 px-10 py-10 md:px-20 gap-5'>
          {latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              color={item.color}
            />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500 text-sm font-bold py-10 animate-pulse'>
          Products available will coming soon....
        </p>
      )}
    </>
  );
};

export default Collections;
