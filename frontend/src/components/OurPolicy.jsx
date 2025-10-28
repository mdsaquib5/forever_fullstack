import React from 'react';
import { Shield, Truck, Headphones, Clock, RefreshCw, Heart } from 'lucide-react';
import Title from './Title';
import Title2 from './Title2';

const OurPolicy = () => {
    const policies = [
        {
            icon: <RefreshCw className="w-8 h-8" />,
            title: "Easy Exchange Policy",
            description: "Hassle-free exchanges within 30 days of purchase",
            features: ["30-day exchange", "No questions asked", "Free pickup"],
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-50 to-emerald-50"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "7 Days Return Policy",
            description: "Full refund guaranteed within 7 days of delivery",
            features: ["7-day returns", "Full refund", "Quick processing"],
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50"
        },
        {
            icon: <Headphones className="w-8 h-8" />,
            title: "24/7 Customer Support",
            description: "Round-the-clock support for all your queries",
            features: ["24/7 availability", "Expert assistance", "Multi-channel support"],
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-50 to-pink-50"
        },
        {
            icon: <Truck className="w-8 h-8" />,
            title: "Free Shipping",
            description: "Free delivery on all orders above $50",
            features: ["Free shipping", "Fast delivery", "Track your order"],
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-50 to-red-50"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Secure Payment",
            description: "100% secure and encrypted payment processing",
            features: ["SSL encrypted", "Multiple options", "Safe & secure"],
            gradient: "from-indigo-500 to-purple-500",
            bgGradient: "from-indigo-50 to-purple-50"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Quality Guarantee",
            description: "Premium quality products with satisfaction guarantee",
            features: ["Quality checked", "Premium materials", "Satisfaction guaranteed"],
            gradient: "from-red-500 to-pink-500",
            bgGradient: "from-red-50 to-pink-50"
        }
    ];

    return (
        <>
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-green-100 to-emerald-100 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Title text="Our Promises" />
                        </div>
                        <Title2 text1="Why Choose" text2="Our Services" />
                    </div>

                    {/* Policies Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {policies.map((policy, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Background Gradient Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${policy.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                <div className="relative p-8">
                                    {/* Icon Container */}
                                    <div className={`w-16 h-16 bg-gradient-to-r ${policy.gradient} rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        {policy.icon}
                                    </div>

                                    {/* Policy Content */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                                        {policy.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {policy.description}
                                    </p>

                                    {/* Features List */}
                                    <ul className="space-y-2">
                                        {policy.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center gap-3 text-sm text-gray-600">
                                                <div className={`w-2 h-2 bg-gradient-to-r ${policy.gradient} rounded-full`}></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-100 rounded-3xl transition-all duration-300 pointer-events-none"></div>

                                {/* Corner Accent */}
                                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${policy.gradient} rounded-bl-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Badges Section */}
                    <div className="mt-16 bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 text-white relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
                            <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white rounded-full"></div>
                        </div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                                Your Trust is Our Priority
                            </h3>
                            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                                We're committed to transparency and customer satisfaction.
                                Every policy is designed to ensure you have the best shopping experience possible.
                            </p>
                            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">100%</div>
                                    <div className="text-sm">Secure</div>
                                </div>
                                <div className="w-px h-8 bg-blue-600"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">24/7</div>
                                    <div className="text-sm">Support</div>
                                </div>
                                <div className="w-px h-8 bg-blue-600"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">30 Days</div>
                                    <div className="text-sm">Exchange</div>
                                </div>
                                <div className="w-px h-8 bg-blue-600"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">Free</div>
                                    <div className="text-sm">Shipping</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-40 animate-pulse"></div>
                <div className="absolute bottom-40 left-20 w-6 h-6 bg-cyan-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-green-400 rounded-full opacity-50 animate-pulse delay-500"></div>
            </section>
        </>
    )
}

export default OurPolicy;