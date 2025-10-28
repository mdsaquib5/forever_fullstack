import React from 'react';
import { assets } from '../assets/asset/assets';
import { ArrowRight } from 'lucide-react';
import Title from './Title';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <>
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-pink-50">
                {/* Background decorative elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-red-200 to-pink-200 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-40 animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-200 to-red-200 rounded-full blur-3xl opacity-50 animate-pulse delay-500"></div>
                </div>

                <div className="relative container mx-auto px-4 py-16 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Content Side - Enhanced with your existing content */}
                        <div className="text-center lg:text-left space-y-8">
                            {/* Your existing bestseller badge - enhanced */}
                            <Title text="OUR BESTSELLERS" />

                            {/* Your existing heading - enhanced */}
                            <h1 className="prata-regular text-4xl sm:text-5xl lg:text-7xl leading-tight lg:leading-[1.2] text-gray-900">
                                Latest
                                <span className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent inline-block pl-2">
                                    Arrivals
                                </span>
                            </h1>

                            {/* Enhanced description */}
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Discover our exclusive collection of premium fashion.
                                Elevate your style with timeless pieces crafted for the modern individual.
                            </p>

                            {/* Enhanced CTA section */}
                            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                                {/* Your existing shop now button - enhanced */}
                                <Link to={'/collection'} className="group relative bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:shadow-red-200">
                                    <div className="flex items-center gap-3">
                                        SHOP NOW
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </Link>
                            </div>

                            {/* Stats section */}
                            <div className="flex justify-center lg:justify-start gap-8 pt-4">
                                <div className="text-center">
                                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">200+</div>
                                    <div className="text-gray-600 text-sm">Brands</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">2k+</div>
                                    <div className="text-gray-600 text-sm">Products</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">30k+</div>
                                    <div className="text-gray-600 text-sm">Customers</div>
                                </div>
                            </div>
                        </div>

                        {/* Image Side - Enhanced */}
                        <div className="relative">
                            {/* Main image container with enhanced effects */}
                            <div className="relative z-10">
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                                    <img
                                        src={assets.banner_img}
                                        alt="Latest Fashion Arrivals"
                                        className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-2xl p-4 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-600">50%</div>
                                        <div className="text-xs text-gray-600">OFF</div>
                                    </div>
                                </div>

                                {/* Floating element 2 */}
                                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl shadow-2xl p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                                    <div className="text-center">
                                        <div className="text-sm font-semibold">New</div>
                                        <div className="text-xs opacity-90">Collection</div>
                                    </div>
                                </div>
                            </div>

                            {/* Background decorative shapes */}
                            <div className="absolute -z-10 top-8 -right-8 w-72 h-72 bg-gradient-to-r from-red-100 to-pink-100 rounded-3xl rotate-12"></div>
                            <div className="absolute -z-10 bottom-8 -left-8 w-64 h-64 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl -rotate-12"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero;