import React, { useState } from 'react';
import { Send, Mail, Gift, Shield, Star } from 'lucide-react';

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Your existing logic
        console.log(email);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setEmail('');
            // You can add a success toast here
            alert('Thank you for subscribing! Check your email for the 20% off coupon.');
        }, 1000);
    };

    return (
        <>
            <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-pink-200 to-rose-200 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div>
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Content Side */}
                            <div className="text-center lg:text-left">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
                                    <Gift className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-semibold text-orange-600">EXCLUSIVE OFFER</span>
                                </div>

                                {/* Main Heading */}
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                    Join Our
                                    <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                        Newsletter
                                    </span>
                                </h2>

                                {/* Description */}
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    Subscribe to our newsletter and be the first to know about exclusive deals,
                                    new arrivals, and fashion tips from our style experts.
                                </p>

                                {/* Benefits List */}
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <Star className="w-3 h-3 text-green-600 fill-current" />
                                        </div>
                                        <span className="text-sm">Get <strong>20% OFF</strong> your first order</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Mail className="w-3 h-3 text-blue-600" />
                                        </div>
                                        <span className="text-sm">Early access to sales & new collections</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Shield className="w-3 h-3 text-purple-600" />
                                        </div>
                                        <span className="text-sm">No spam, unsubscribe anytime</span>
                                    </div>
                                </div>

                                {/* Trust Stats */}
                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">10K+</div>
                                        <div>Subscribers</div>
                                    </div>
                                    <div className="w-px h-8 bg-gray-300"></div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">4.8</div>
                                        <div>Rating</div>
                                    </div>
                                    <div className="w-px h-8 bg-gray-300"></div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">99%</div>
                                        <div>Satisfaction</div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Side */}
                            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                                {/* Form Header */}
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <Mail className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Subscribe & Save
                                    </h3>
                                    <p className="text-gray-600">
                                        Enter your email to claim your discount
                                    </p>
                                </div>

                                {/* Newsletter Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                                            required
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-3 group"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Subscribing...
                                            </>
                                        ) : (
                                            <>
                                                Subscribe Now
                                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Privacy Note */}
                                <p className="text-center text-xs text-gray-500 mt-6">
                                    By subscribing, you agree to our Privacy Policy and consent to receive
                                    updates from our company.
                                </p>

                                {/* Success Rate */}
                                <div className="mt-6 p-4 bg-green-50 rounded-2xl text-center">
                                    <div className="flex items-center justify-center gap-2 text-green-700 text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span>Join 10,000+ happy subscribers receiving exclusive offers</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 right-20 w-6 h-6 bg-orange-400 rounded-full opacity-40 animate-pulse"></div>
                <div className="absolute bottom-40 left-20 w-4 h-4 bg-red-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-5 h-5 bg-pink-400 rounded-full opacity-50 animate-pulse delay-500"></div>
            </section>
        </>
    )
}

export default NewsLetter;