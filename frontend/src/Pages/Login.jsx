import React, { useContext, useEffect, useState } from "react";
import DynamicHeropage from "../components/DynamicHeropage/DynamicHeropage";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
// import { set } from "mongoose";
// import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Signup");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (currentState === "Signup") {
        response = await axios.post(`${backendUrl}/api/user/signup`, {
          name,
          email,
          password,
        });
        setToken(response.data.token);
        // localStorage.setItem("token", response.data.token);
        
        alert(response.data.message);

      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if(response.data.success){
          setToken(response.data.token);

          localStorage.setItem("token", response.data.token);
          alert(response.data.message);

        }
        else{
          alert(response.data.message)
        }
      }

    
    
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong!");
      }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <DynamicHeropage />

      {/* Glass Form */}
      <div className="flex justify-center items-center mt-[-120px] sm:mt-[-150px] min-h-[70vh] px-4">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-[90%] sm:max-w-md m-auto bg-white/20 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl py-10 px-8 sm:px-10 gap-5 text-white transition-all duration-700"
        >
          {/* Heading */}
          <div className="inline-flex items-center gap-2 mb-4">
            <p className="text-3xl text-violet-700 font-semibold drop-shadow-md tracking-wide">
              {currentState === "Signup" ? "Sign Up" : "Login"}
            </p>
            <hr className="border-none h-[1.5px] w-10 bg-violet-700/70" />
          </div>

          {/* Input Fields */}
          {currentState === "Signup" && (
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 bg-white/20 text-violet-700 placeholder-gray-700 border-b-2 border-gray-950 focus:ring-violet-500 outline-none"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            required
            className="w-full px-4 py-2.5 bg-white/20 text-violet-700 placeholder-gray-700 border-b-2 border-gray-950 focus:ring-violet-500 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="w-full px-4 py-2.5 bg-white/20 text-violet-700 placeholder-gray-700 border-b-2 border-gray-950 focus:ring-violet-500 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Forgot + Toggle */}
          <div className="w-full flex justify-between text-sm mt-1">
            <p className="cursor-pointer text-violet-300 hover:text-violet-100 transition">
              Forgot password?
            </p>
            {currentState === "Login" ? (
              <p
                className="cursor-pointer text-violet-400 hover:text-violet-200 transition"
                onClick={() => setCurrentState("Signup")}
              >
                Don’t have an account?
                <span className="text-violet-700 font-medium ml-1">Signup</span>
              </p>
            ) : (
              <p
                className="cursor-pointer text-violet-400 hover:text-violet-200 transition"
                onClick={() => setCurrentState("Login")}
              >
                Already have an account?
                <span className="text-white font-medium ml-1">Login</span>
              </p>
            )}
          </div>

          {/* Button */}
          <button className="mt-4 w-full px-4 py-2.5 bg-violet-600 hover:bg-violet-700 rounded-lg font-semibold tracking-wide transition-all duration-300 shadow-md">
            {currentState === "Signup" ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
