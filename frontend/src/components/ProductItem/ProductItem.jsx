import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, color }) => {

    return (

        <Link to={`/product/${id}`}>

            <div className='flex items-center justify-center overflow-hidden cursor-pointer '>
                <img src={image[0]} alt="" className=' hover:scale-110 transition ease-in-out' />
            </div>
            <div className='flex  flex-col justify-start items-start'>

                <h2 className='py-2 pb-1 text-sm'>{name}</h2>
                <h3 className='text-sm font-medium'>₹{price}</h3>
                <p className="text-xs text-gray-700 mt-1 flex items-center gap-2">
                    Color:
                    <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}></span>
                    <span className="capitalize font-medium">{color}</span>
                </p>

            </div>
        </Link>

    )
}

export default ProductItem