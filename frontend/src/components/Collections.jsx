import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import Title2 from './Title2';

const Collections = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])

    return (
        <>
            <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-red-100 to-pink-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Enhanced Header Section */}
                    <div className="text-center mb-16">
                        {/* Decorative Top Elements */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Title text="Trending Now" />
                        </div>

                        {/* Main Title */}
                        <div className="mb-8">
                            <Title2 text1="See What's" text2="Hot" />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
                        {
                            latestProducts.map((item, index) => (
                                <ProductItem key={index} item={item} />
                            ))
                        }
                    </div>

                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 right-10 w-6 h-6 bg-red-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-40 left-10 w-8 h-8 bg-pink-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-40 animate-pulse delay-500"></div>
            </section>
        </>
    )
}

export default Collections;