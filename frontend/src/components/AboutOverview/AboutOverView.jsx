import React from 'react'

const AboutOverView = () => {
    return (
        <div className="flex flex-col md:flex-row justify-start items-center px-4 py-8 md:px-10 md:py-16">

            {/* Image Section */}
            <img
                src="https://knyamed.com/cdn/shop/files/Homepage_section.png?v=1760533516&width=1500"
                alt="about"
                className="w-[400px] h-[400px]    rounded-3xl object-contain"
            />

            {/* Text Section */}
            <div className="flex flex-col gap-4 mt-6 md:mt-0 md:ml-6 bg-amber-100 p-5 md:p-12 rounded-lg shadow-md w-full md:w-auto">
                <h2 className="text-2xl md:text-3xl text-violet-700 font-semibold">
                    <span className="text-violet-700 font-bold">DRIFT:</span> A Jacket for Medicos
                </h2>
                <p className="text-violet-800 text-base md:text-2xl leading-relaxed">
                    India’s first winter jacket for medicos — made for warmth, movement, and focus.
                    Fleece-bonded fabric, stretch back panels, and functional pockets for everything
                    your shift demands. Built for layering over scrubs.
                </p>
                <div className='flex justify-center items-center'>

                 <button className='px-10 py-3 rounded-lg w-fit bg-violet-600  text-white cursor-pointer'>Shop</button>
                </div>
            </div>

        </div>
    )
}

export default AboutOverView
