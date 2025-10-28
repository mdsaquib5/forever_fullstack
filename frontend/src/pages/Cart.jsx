import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import CartTotal from '../components/CartTotal';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Title2 from '../components/Title2';

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

    const handleQuantityChange = (id, size, newQuantity) => {
        if (newQuantity === "" || newQuantity === "0") return;
        updateQuantity(id, size, Number(newQuantity));
    };

    const incrementQuantity = (id, size, currentQuantity) => {
        updateQuantity(id, size, currentQuantity + 1);
    };

    const decrementQuantity = (id, size, currentQuantity) => {
        if (currentQuantity > 1) {
            updateQuantity(id, size, currentQuantity - 1);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <Title2 text1="Your" text2="Shopping Cart" />
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Review your items and proceed to checkout when ready
                        </p>
                    </div>

                    {/* Cart Content */}
                    <div className="max-w-6xl mx-auto">
                        {cartData.length === 0 ? (
                            // Empty Cart State
                            <div className="text-center py-20">
                                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShoppingBag className="w-16 h-16 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h3>
                                <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
                                <button 
                                    onClick={() => navigate('/collection')}
                                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Cart Items */}
                                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                                    {/* Cart Header */}
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 hidden md:grid grid-cols-12 gap-6 text-sm font-semibold text-gray-700">
                                        <div className="col-span-6">PRODUCT</div>
                                        <div className="col-span-2 text-center">SIZE</div>
                                        <div className="col-span-2 text-center">QUANTITY</div>
                                        <div className="col-span-2 text-center">ACTIONS</div>
                                    </div>

                                    {/* Cart Items List */}
                                    <div className="divide-y divide-gray-100">
                                        {cartData.map((item, index) => {
                                            const productData = products.find((product) => product._id === item._id);
                                            return (
                                                <div key={index} className="p-6 hover:bg-gray-50 transition-all duration-300">
                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                                        {/* Product Info */}
                                                        <div className="md:col-span-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="relative">
                                                                    <img 
                                                                        src={productData.image[0].url} 
                                                                        alt={productData.name}
                                                                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl shadow-md"
                                                                    />
                                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                                        {item.quantity}
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                                                                        {productData.name}
                                                                    </h3>
                                                                    <p className="text-xl font-bold text-red-600">
                                                                        {currency}{productData.price}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Size */}
                                                        <div className="md:col-span-2">
                                                            <div className="flex flex-col items-center md:items-start">
                                                                <span className="text-sm text-gray-500 mb-1 md:hidden">Size</span>
                                                                <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300">
                                                                    {item.size}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Quantity Controls */}
                                                        <div className="md:col-span-2">
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-sm text-gray-500 mb-2 md:hidden">Quantity</span>
                                                                <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1 border border-gray-200">
                                                                    <button
                                                                        onClick={() => decrementQuantity(item._id, item.size, item.quantity)}
                                                                        className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors duration-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                                                        disabled={item.quantity <= 1}
                                                                    >
                                                                        <Minus className="w-4 h-4" />
                                                                    </button>
                                                                    
                                                                    <input 
                                                                        type="number" 
                                                                        min="1"
                                                                        value={item.quantity}
                                                                        onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
                                                                        className="w-12 text-center bg-transparent border-none outline-none text-gray-900 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                    />
                                                                    
                                                                    <button
                                                                        onClick={() => incrementQuantity(item._id, item.size, item.quantity)}
                                                                        className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors duration-200 text-gray-600"
                                                                    >
                                                                        <Plus className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Remove Button */}
                                                        <div className="md:col-span-2">
                                                            <div className="flex justify-center md:justify-end">
                                                                <button
                                                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                                                    className="cursor-pointer flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-300 group"
                                                                >
                                                                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                                                    <span className="text-sm font-semibold">Remove</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Cart Summary & Checkout */}
                                <div className="grid lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2">
                                        {/* Continue Shopping */}
                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                            <button 
                                                onClick={() => navigate('/collection')}
                                                className="cursor-pointer w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 flex items-center justify-center gap-3"
                                            >
                                                <ShoppingBag className="w-5 h-5" />
                                                Continue Shopping
                                            </button>
                                        </div>
                                    </div>

                                    {/* Cart Total */}
                                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 sticky top-8">
                                        <div className="mb-6">
                                            <CartTotal />
                                        </div>
                                        
                                        <button 
                                            onClick={() => navigate('/place-order')}
                                            className="cursor-pointer w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
                                        >
                                            Proceed to Checkout
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </button>

                                        {/* Security Badge */}
                                        <div className="mt-6 text-center">
                                            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                Secure Checkout
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;