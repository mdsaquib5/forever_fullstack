import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Title from './Title';
import Title2 from './Title2';

const ProductCategories = () => {
    const categories = [
        {
            id: 1,
            name: "Casual",
            image: "https://ochaka.vercel.app/images/section/box-image-14.jpg",
            items: "150+ Products",
            description: "Stylish outfits for the modern man",
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50"
        },
        {
            id: 2,
            name: "Sports",
            image: "https://ochaka.vercel.app/images/section/box-image-15.jpg",
            items: "200+ Products",
            description: "Elegant fashion for every occasion",
            gradient: "from-pink-500 to-rose-500",
            bgGradient: "from-pink-50 to-rose-50"
        },
        {
            id: 3,
            name: "Sneakers",
            image: "https://ochaka.vercel.app/images/section/box-image-13.jpg",
            items: "80+ Products",
            description: "Complete your look with style",
            gradient: "from-purple-500 to-indigo-500",
            bgGradient: "from-purple-50 to-indigo-50"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <Title text="SHOP BY CATEGORY" />
                    </div>
                    <Title2 text1="Explore Our" text2="Categories" />
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Background Gradient Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            {/* Image Container */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`inline-block bg-gradient-to-r ${category.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                                        {category.items}
                                    </span>
                                </div>

                                {/* Hover Action Button */}
                                <div className="absolute bottom-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <Link
                                        to={'/collection'}
                                        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                                    >
                                        <ArrowRight className="w-5 h-5 text-gray-700" />
                                    </Link>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {category.description}
                                </p>

                                {/* Progress Bar Indicator */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                                        <span>Popularity</span>
                                        <span>{85 + index * 2}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full bg-gradient-to-r ${category.gradient} transition-all duration-1000 ease-out`}
                                            style={{ width: `${85 + index * 2}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* View Collection Button */}
                                <Link
                                    to={'/collection'}
                                    className={`text-sm font-semibold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent hover:gap-3 transition-all duration-300 group/btn`}
                                >
                                    View Collection
                                </Link>
                            </div>

                            {/* Corner Accent */}
                            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${category.gradient} rounded-bl-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                        </div>
                    ))}
                </div>

                {/* View All Categories CTA */}
                <div className="text-center mt-12">
                    <Link
                        to={'/collection'}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:shadow-red-200 group"
                    >
                        Explore All Categories
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute left-0 bottom-0 w-72 h-72 bg-gradient-to-r from-red-100 to-pink-100 rounded-full blur-3xl opacity-40 -z-10"></div>
            <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        </section>
    );
};

export default ProductCategories;