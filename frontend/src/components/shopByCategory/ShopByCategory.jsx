import React from 'react';
import { Link } from 'react-router-dom';

const ShopByCategory = () => {
  const category = [
    {
      id: 1,
      path: "/women",
      label: "Women",
      image:
        "https://media.istockphoto.com/id/1735900356/photo/portrait-of-indian-young-woman-crossed-hands-wear-sari-isolated-over-white-background-stock.webp?a=1&b=1&s=612x612&w=0&k=20&c=2iLYJodOwRiUhltFChqZV-XurZC__kTf6Ndnlh4lMmM=",
    },
    {
      id: 2,
      path: "/men",
      label: "Men",
      image:
        "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: 3,
      path: "/bulk",
      label: "Bulk",
      image:
      "https://images.unsplash.com/photo-1697805425151-1a9a03f85741?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJ1bGslMjBjbG90aGVzfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: 4,
      path: "/child",
      label: "Child",
      image:
        "https://images.unsplash.com/photo-1440288736878-766bd5839edb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2lkfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
  ];

  return (
    <div className="px-7 py-12 md:px-20 bg-white">
      {/* Section Title */}
      <h2 className="font-semibold text-[#eb1c77] text-2xl md:text-3xl mb-8">
        Shop By Category
      </h2>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-gray-800 font-bold">
        {category.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="relative group h-20 sm:h-40 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-[#eb1c77]/60 transition-all duration-500"></div>

            {/* Label */}
            <div className="relative z-10 flex justify-center items-center h-full text-white text-lg sm:text-xl tracking-widest uppercase">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
