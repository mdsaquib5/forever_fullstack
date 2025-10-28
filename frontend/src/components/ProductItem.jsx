import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ item }) => {
    const { currency, addToCart } = useContext(ShopContext);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <div
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Product Image Container */}
                <Link to={`/product/${item._id}`} className="block relative overflow-hidden">
                    <img
                        src={item.image[0].url}
                        alt={item.name}
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />

                    {
                        item.bestseller && (
                            <div className="absolute top-3 right-3">
                                <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                    Bestseller
                                </span>
                            </div>
                        )
                    }

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Add to Cart Button - Slide Up */}
                    <div className={`absolute bottom-3 left-3 right-3 transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                        <button onClick={() => navigate(`/product/${item._id}`)}
                            className="cursor-pointer w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                            Buy Now
                        </button>
                    </div>
                </Link>

                {/* Product Information */}
                <div className="p-4">
                    {/* Category and Rating */}
                    <div className="flex items-center justify-between mb-2">
                    </div>

                    {/* Product Name */}
                    <Link to={`/product/${item._id}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                            {item.name}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">{currency}{item.price}</span>
                    </div>

                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-100 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </div>
        </>
    )
}

export default ProductItem;

// const { currency } = useContext(ShopContext);
//     // console.log("Item is", item);

// <Link to={`/product/${item._id}`} className='text-gray-700 cursor-pointer border border-gray-200 rounded-md'>
//             <div className='overflow-hidden border-b border-gray-200'>
//                 <img src={item.image[0].url} alt="" className='hover:scale-110 transition ease-in-out' />
//             </div>
//             <div className='p-2'>
//                 <p className='pb-1 text-sm'>{item.name}</p>
//                 <p className=' text-sm font-medium'>{currency}{item.price}</p>
//             </div>
//         </Link>