import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'

const CartTotal = () => {

    const { currency, deliveryFee, getCartTotalAmount } = useContext(ShopContext);
    return (
        <div className='w-full pr-10'>
            <div className='text-2xl'>
                <h2 className='font-bold'>Cart Total</h2>
            </div>
            <div className='flex flex-col gap-1  mt-3 text-sm'>
                <div className='flex justify-between'>
                    <p className='text-sm font-bold text-gray-600'>SubTotal</p>
                    <p>{currency}{getCartTotalAmount()}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p className='text-sm font-bold text-gray-600'>shippingFee</p>
                    <p>{currency}{getCartTotalAmount() === 0 ? 0 : deliveryFee}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p className='text-sm font-bold text-gray-600'>Total</p>
                    <p>{currency}{getCartTotalAmount() === 0 ? 0 : getCartTotalAmount() + deliveryFee}.00</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal