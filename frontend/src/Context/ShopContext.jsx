import { createContext, use, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export const ShopContext = createContext();



const ShopContextProvider = (props) => {
    
    const currency = "₹";
    const deliveryFee = 50
    const  backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    const[token,setToken]=useState('')
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})


//search functionality


    
    // Add to cart
    const addToCart = async (itemId, size) => {
        if(!size) 
            return  alert("Please select a size")
        
        let cartData = structuredClone(cartItems);
        
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size]++;
            }
            else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)
        if(token){
            try {
                await axios.post(backendUrl+"/api/cart/add-to-cart",{itemId,size},
                    {headers:{authorization:`Bearer ${token}`}}
                )
            } catch (error) {
                console.log(error);
                alert(error.response?.data?.message || "Failed to add to cart");
                
            }
        }
    }




    //update Quantity
const updateQuantity = async (itemId, size, quantity) => {
  let cartData = structuredClone(cartItems);
  cartData[itemId][size] = quantity;
  if (quantity <= 0) {
    delete cartData[itemId][size];
    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
  }
  setCartItems(cartData);
  if (token) {
    try {
      await axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, size, quantity },
        { headers: { authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update quantity");
    }
  }
};



//getUserCart

const getUserCart =async()=>{
    try {
        const response = await axios.get(backendUrl+"/api/cart/get-cart-items",{headers:{authorization:`Bearer ${token}`}})
        if(response.data.success){
            // console.log(response.data.cartData);
            setCartItems(response.data.cartData)

        }
    } catch (error) {
     console.log(error);
     alert(error.response?.data?.message || "Failed to get cart items");   
    }
}




//getCartTotal Amount

const getCartTotalAmount =()=>{
    let totalAmount =0;
    for(const items in cartItems){
        for(const item in cartItems[items]){
            try {
                totalAmount += cartItems[items][item] * products.find((product)=>product._id===items).price
            } catch (error) {
                console.log(error);
            }
        }
    }
    return totalAmount
}




//getProducts 
const getProducts = async()=>{
    try {
        const response = await axios.get(backendUrl+"/api/product/list-product")
        if(response.data.success){
         setProducts(response.data.products)
        }else{
            // alert(response.data.message)
            // console.log(response.data.message);
        }
    } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Failed to fetch products");
    }
}

useEffect(()=>{
    const savedToken = localStorage.getItem("token")
    const savedName = localStorage.getItem("username")
    if(savedToken){
        setToken(savedToken)
    }
    if(savedName){
        setUserName(savedName)
    }
    getProducts();
},[products])


useEffect(()=>{
   
    if(token){
        getUserCart()
    }
},[token])




//get cart items count
  const getCartItemsCount =()=>{
     let count = 0;
     for(const items in cartItems){
        for(const item in cartItems[items]){
            try {
                if(cartItems[items][item]>0){
                    count += cartItems[items][item]
                }
            } catch (error) {
                console.log(error);
            }
        }
     }
     return count
  }


    const value = {
        products,
        currency,
        deliveryFee,
        cartItems,
        setCartItems,
        navigate,
        addToCart,
        getCartItemsCount,
        updateQuantity,
        getCartTotalAmount,
        backendUrl,
        token,
        setToken,
        
       
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider