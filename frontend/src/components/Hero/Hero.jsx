import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, scale } from "framer-motion"

const Hero = () => {
    const slides = [
        {
            id: 1,
            title: "Premium Corporate Uniforms",
            desc: "Redefine professionalism with our tailored corporate uniforms — crafted for comfort, durability, and elegance.",
            btnText: "Explore Collection",
            img: "https://plus.unsplash.com/premium_photo-1671469876887-b2733ac9c785?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=1000",
        },
        {
            id: 2,
            title: "Stylish School Uniforms",
            desc: "From preschool to high school — discover perfectly stitched, high-quality school uniforms for every student.",
            btnText: "Shop School Wear",
            img: "https://images.unsplash.com/photo-1624521036130-3bd34caf4c64?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5lZGVybGFuZHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900",
        },
        {
            id: 3,
            title: "Smart Industrial & Workwear",
            desc: "Safety meets comfort. Get durable and functional uniforms for your workforce with customized branding options.",
            btnText: "Get a Quote",
            img: "https://images.unsplash.com/photo-1758691461516-7e716e0ca135?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHdvcmslMjB1bmlmb3Jtc3xlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900",
        },
    ];
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => prev === slides.length - 1 ? 0 : prev + 1)
        }, 5000);
        return () => clearInterval(timer)
    }, [])


    return (


        <section className='relative w-full h-[80vh] overflow-hidden'>
            <AnimatePresence>
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className='absolute inset-0'>

                    <img
                        src={slides[current].img}
                        alt={slides[current].title}
                        className="w-full h-full object-cover"
                    />

                    <div className='absolute inset-0 bg-black/30'></div>

                    <div className='absolute top-1/2 left-10 md:left-24 transform -translate-y-1/2 text-white max-w-2xl'>
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className='text-4xl md:text-6xl font-bold mb-4'>
                            {slides[current].title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg md:text-xl mb-6 text-gray-200"
                        >{slides[current].desc}
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="px-8 py-3 bg-[#eb1c77] text-white font-semibold rounded-full shadow-md hover:bg-[#ff5fa2] transition-all duration-300">
                            {slides[current].btnText}
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className='absolute bottom-6 left-1/2  -translate-x-1/2 flex gap-3'>

                {slides.map((_, index) => (
                    <button

                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${current === index ? "bg-pink-600" : "bg-white"}`}
                    >

                    </button>
                ))}
            </div>
        </section>
    )
}

export default Hero