import React, { useState } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import Title from './Title';
import Title2 from './Title2';

const CustomerReviews = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Fashion Influencer",
            rating: 5,
            comment: "The quality of the products is exceptional! I've been shopping here for months and every piece exceeds my expectations. The fabric quality and stitching are premium.",
            avatar: "https://ochaka.vercel.app/images/avatar/avatar-1.jpg",
            purchase: "Summer Dress Collection",
            verified: true
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Regular Customer",
            rating: 5,
            comment: "Fast shipping and amazing customer service. The size guide was accurate and the clothes fit perfectly. Will definitely order again!",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            purchase: "Men's Casual Wear",
            verified: true
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Fashion Blogger",
            rating: 4,
            comment: "Love the unique designs and attention to detail. The colors are exactly as shown online. The packaging was also very elegant.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            purchase: "Evening Gown Collection",
            verified: true
        },
        {
            id: 4,
            name: "David Wilson",
            role: "First-time Buyer",
            rating: 5,
            comment: "Impressed with the quality at this price point. The customer support team was very helpful in choosing the right size. Highly recommended!",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            purchase: "Business Formal Wear",
            verified: true
        },
        {
            id: 5,
            name: "Jessica Brown",
            role: "Loyal Customer",
            rating: 5,
            comment: "I'm obsessed with their collections! The styles are trendy yet timeless. The loyalty program offers great benefits too.",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            purchase: "Accessories & Footwear",
            verified: true
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Display 3 testimonials at a time for desktop
    const visibleTestimonials = [
        testimonials[currentSlide],
        testimonials[(currentSlide + 1) % testimonials.length],
        testimonials[(currentSlide + 2) % testimonials.length]
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-100 to-pink-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Title text="Happy Customers" />
                    </div>
                    <Title2 text1="What Our" text2="Customers Say" />
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
                    <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
                        <div className="text-gray-600">Average Rating</div>
                    </div>
                    <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                        <div className="text-gray-600">Happy Customers</div>
                    </div>
                    <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                        <div className="text-gray-600">Recommend Us</div>
                    </div>
                    <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                        <div className="text-gray-600">Support</div>
                    </div>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Navigation Arrows */}
                    <button 
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-red-600 hover:shadow-xl transition-all duration-300 z-10"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    <button 
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-red-600 hover:shadow-xl transition-all duration-300 z-10"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {visibleTestimonials.map((testimonial, index) => (
                            <div 
                                key={testimonial.id}
                                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 p-8 border border-gray-100 relative group"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-full flex items-center justify-center">
                                    <Quote className="w-6 h-6 text-red-400" />
                                </div>

                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < testimonial.rating 
                                                    ? 'fill-yellow-400 text-yellow-400' 
                                                    : 'fill-gray-200 text-gray-200'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-gray-700 leading-relaxed mb-6 italic line-clamp-4">
                                    "{testimonial.comment}"
                                </p>

                                {/* Customer Info */}
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-red-100"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                            {testimonial.verified && (
                                                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                        <p className="text-xs text-gray-500 mt-1">Purchased: {testimonial.purchase}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentSlide 
                                        ? 'bg-red-600 w-8' 
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 right-20 w-4 h-4 bg-red-400 rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute bottom-40 left-20 w-6 h-6 bg-pink-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
        </section>
    );
};

export default CustomerReviews;