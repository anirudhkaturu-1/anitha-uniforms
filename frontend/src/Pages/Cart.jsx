import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import CartTotal from '../components/GetCartTotal/CartTotal';
import DynamicHeropage from '../components/DynamicHeropage/DynamicHeropage';

const Cart = () => {

  const { products, cartItems,  getCartItemsCount, updateQuantity,navigate,token } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const[message,setMessage]=useState("");

  const handleCheckOut =()=>{
    if(token){
      navigate("/place-order")
    }else{
      setTimeout(()=>{
        setMessage("Please login to checkout");
        navigate("/login")
      },1000)
    }

  }

  useEffect(() => {
    let tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            ...products.find((product) => product._id === items),
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);


  return (
    <>
      <DynamicHeropage/>
    <div className="border-t pt-14">
      <h2 className="px-10 text-2xl font-bold uppercase text-gray-800 mb-6">
        Your Cart Items
      </h2>

      {cartData.length > 0 ? (
        <div className="space-y-4">
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div
                key={index}
                className="px-5 sm:px-10 py-5 rounded-xl shadow-sm hover:shadow-md transition-shadow grid grid-cols-[4fr_1fr_1fr_1fr] sm:grid-cols-[4fr_2fr_2fr_1fr] items-center gap-4 bg-white"
              >
                {/* Product Info */}
                <div className="flex items-start gap-5">
                  <Link to={`/product/${productData._id}`}>
                    <img
                      src={productData.image[0]}
                      alt={productData.name}
                      className="w-16 sm:w-24 rounded-lg object-cover"
                    />
                  </Link>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-gray-600">
                      <p className="font-medium">
                        ₹{productData.price}
                      </p>
                      <p className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs rounded-md">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity Input */}
                <div className="flex justify-center">
                  <input
                    onChange={(e) => e.target.value === " " || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                    className="w-12 sm:w-16 text-center border border-gray-300 rounded-md py-1 outline-none focus:ring-2 focus:ring-violet-400"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                </div>

                {/* Total Price */}
                <p className="text-center font-medium text-gray-700">
                  ₹{productData.price * item.quantity}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="text-red-500 text-xl hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <RiDeleteBin6Fill />
                </button>
              </div>
            );
          })}

          {/* Cart Summary Section */}
          <div className="px-10 py-6 mt-8 bg-gray-50 border-t rounded-lg flex flex-col sm:flex-row justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 sm:mb-0">
              Total:{" "}
              <span className="text-violet-700">
                ₹
                {cartData.reduce((acc, item) => {
                  const product = products.find((p) => p._id === item._id);
                  return acc + product.price * item.quantity;
                }, 0)}
              </span>
            </h3>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty cart"
            className="w-32 mb-4 opacity-80"
            />
          <p className="text-gray-500 text-lg animate-pulse">
            Your Cart is Empty
          </p>
          <button className="mt-4 bg-violet-700 hover:bg-violet-800 text-white px-6 py-2 rounded-full transition-all">
            Continue Shopping
          </button>
        </div>
      )}
      <div className='flex justify-end my-20'>
        {
          cartData.length>0 && <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div onClick={handleCheckOut} className='mt-5'>
              <button  className="bg-violet-700 hover:bg-violet-800 text-white px-8 py-2 rounded-full font-medium transition-all cursor-pointer">
              Proceed to Checkout →
            </button>
              {message && <p className="text-red-500 mt-2">{message}</p>}

          </div>
        </div>
        }
       

      </div>
    </div>
            </>

  )
}

export default Cart