import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/asset/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    // Getting context
    const { products, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext);
    // Cart Data
    const [cartData, setCartData] = useState([]);

    // This useEffect is use to log cart items
    useEffect(() => {
        if (products.length > 0) {
            // Setting temp data
            const tempData = [];
            //   
            for (const items in cartItems) {
                // Looping through size
                for (const item in cartItems[items]) {
                    // Checking if quantity is greater than 0
                    if (cartItems[items][item] > 0) {
                        // Pushing data to temp data
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        })
                    }
                }

            }
            //   Setting cart data
            setCartData(tempData);
        }
    }, [cartItems, products])

    return (
        <>
            <div className='border-t pt-14 border-gray-200'>
                <div className=' text-2xl mb-3'>
                    <Title text1="YOUR" text2="CART" />
                </div>
                <div>
                    {
                        cartData.map((item, index) => {
                            const productData = products.find((product) => product._id === item._id);
                            return (
                                <div key={index} className='py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                                    <div className='flex items-start gap-6'>
                                        <img src={productData.image[0].url} alt="" className='w-16 sm:w-20' />
                                        <div>
                                            <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                            <div className='flex items-center gap-5 mt-2'>
                                                <p>{currency}{productData.price}</p>
                                                <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="number" min={1} value={item.quantity} onChange={(e) => e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />
                                    <img src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer' alt="" onClick={() => updateQuantity(item._id, item.size, 0)} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex justify-end my-20'>
                    <div className='w-full sm:w-[450px]'>
                        <CartTotal />
                        <div className='w-full text-end'>
                            <button onClick={() => navigate('/place-order')} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer my-8'>Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;