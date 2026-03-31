import React from "react";
import { useLocation } from "react-router-dom";

const DynamicHeropage = () => {
  const location = useLocation();

  const heroData = {
    "/": {
      title: "Welcome to Our Shop",
      subtitle: "Find everything you love — all in one place",
      image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/about": {
      title: "About Us",
      subtitle: "Learn more about our mission and values",
      image:
        "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/women": {
      title: "Women's Collection",
      subtitle: "Discover elegant, trendy, and timeless styles",
      image:
        "https://plus.unsplash.com/premium_photo-1719943510748-4b4354fbcf56?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/men": {
      title: "Men's Collection",
      subtitle: "Redefine your wardrobe with premium styles",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/child": {
      title: "Kids’ Collection",
      subtitle: "Cute, comfy, and fun styles for the little ones",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/bulk": {
      title: "Bulk Orders",
      subtitle: "Get exclusive discounts on wholesale purchases",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/collections": {
      title: "Our Collections",
      subtitle: "Curated picks for every style and season",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/contact": {
      title: "Contact Us",
      subtitle: "We’d love to hear from you — get in touch today!",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/track-order": {
      title: "Track Your Order",
      subtitle: "Check your order status and delivery updates",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/place-order": {
      title: "Place Your Order",
      subtitle: "Secure checkout and fast delivery",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/login": {
      title: "Welcome Back",
      subtitle: "Sign in to access your account and track orders",
      image:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    "/product": {
      title: "Product Details",
      subtitle: "Discover more about your favorite product",
      image:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
  };

  const data = heroData[location.pathname] || heroData["/"];

  return (
    <div
      className="relative w-full h-[60vh] flex items-center justify-center text-center text-white overflow-hidden shadow-lg  transition-all"
      style={{
        backgroundImage: `url(${data.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 px-6">
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 drop-shadow-lg">
          {data.title}
        </h2>
        <p className="text-lg sm:text-xl font-light text-gray-200 drop-shadow-md">
          {data.subtitle}
        </p>
      </div>
    </div>
  );
};

export default DynamicHeropage;
