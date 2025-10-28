import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Title2 from './Title2';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 4));
    }, [products])

    return (
        <>
            <section className="py-20 bg-gradient-to-br from-white to-orange-50 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100 to-red-100 rounded-full blur-3xl opacity-40 translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-yellow-50 to-amber-50 rounded-full blur-3xl opacity-30 -translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Enhanced Header Section */}
                    <div className="text-center mb-16">
                        {/* Decorative Top Elements */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Title text="Top Rated" />
                        </div>
                        {/* Main Title */}
                        <Title2 text1="Products You" text2="Can Trust" />
                    </div>
                    {/* Best Seller Products Grid */}
                    <div className="mb-16">
                        {/* Products Grid with Enhanced Styling */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {bestSeller.map((item, index) => (
                                <ProductItem key={index} item={item} />

                            ))}
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-20 w-6 h-6 bg-orange-400 rounded-full opacity-40 animate-pulse"></div>
                <div className="absolute bottom-40 right-20 w-4 h-4 bg-red-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-5 h-5 bg-yellow-400 rounded-full opacity-50 animate-pulse delay-500"></div>
            </section>
        </>
    )
}

export default BestSeller;


{/* Rendering Products */ }
// <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//     {
//         bestSeller.map( (item, index) =>(
//             <ProductItem key={index} item={item}/>
//         ))
//     }
// </div>

{/* <div className="absolute top-3 right-3">
                                <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                    Bestseller
                                </span>
                                 </div> */}