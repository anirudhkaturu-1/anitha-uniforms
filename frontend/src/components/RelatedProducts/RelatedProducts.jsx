import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import ProductItem from '../ProductItem/ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = [...products];

      // Handle both string or array cases
      if (category) {
        productCopy = productCopy.filter(item =>
          Array.isArray(category)
            ? category.includes(item.category)
            : item.category === category
        );
      }

      if (subCategory) {
        productCopy = productCopy.filter(item =>
          Array.isArray(subCategory)
            ? subCategory.includes(item.subCategory)
            : item.subCategory === subCategory
        );
      }

      setRelated(productCopy.slice(0, 8));
    }
  }, [products, category, subCategory]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-5 text-violet-700">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {related.length > 0 ? (
          related.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-full">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
