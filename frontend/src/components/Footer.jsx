import React from 'react';
import {
    Phone,
    Mail,
    MapPin,
    Heart,
    CreditCard,
    Shield,
    Truck,
    Clock,
    Facebook,
    Twitter,
    Instagram,
    Youtube
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const paymentMethods = [
        'visa', 'mastercard', 'paypal', 'apple-pay', 'google-pay'
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
        { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
        { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
        { icon: Youtube, href: '#', color: 'hover:text-red-600' }
    ];

    return (
        <>
            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
                </div>

                {/* Main Footer Content */}
                <div className="container mx-auto px-4 relative z-10">

                    {/* Middle Section - Main Footer Links */}
                    <div className="py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Brand Column */}
                            <div className="lg:col-span-1">
                                <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
                                    ForeverStyle
                                </div>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Your premier destination for fashion and style. We bring you the latest trends with quality you can trust.
                                </p>

                                {/* Contact Info */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Phone className="w-4 h-4 text-red-400" />
                                        <span>+880123456789</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Mail className="w-4 h-4 text-red-400" />
                                        <span>forever@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <MapPin className="w-4 h-4 text-red-400" />
                                        <span>123 Fashion Street, Style City</span>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-4">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:bg-gray-700 hover:scale-110`}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Shopping Column */}
                            <div>
                                <h4 className="text-lg font-semibold mb-6 text-white">Shopping</h4>
                                <ul className="space-y-3">
                                    {['All Products', 'New Arrivals', 'Best Sellers', 'Sale Items', 'Trending Now', 'Limited Edition'].map((item, index) => (
                                        <li key={index}>
                                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Information Column */}
                            <div>
                                <h4 className="text-lg font-semibold mb-6 text-white">Information</h4>
                                <ul className="space-y-3">
                                    {['About Us', 'Contact Us', 'Privacy Policy', 'Terms & Conditions', 'Return Policy', 'Shipping Info', 'Size Guide', 'FAQs'].map((item, index) => (
                                        <li key={index}>
                                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Customer Service Column */}
                            <div>
                                <h4 className="text-lg font-semibold mb-6 text-white">Customer Service</h4>
                                <ul className="space-y-3">
                                    {['My Account', 'Order Tracking', 'Wishlist', 'Returns & Exchanges', 'Shipping Rates', 'Contact Support', 'Size Chart', 'Gift Cards'].map((item, index) => (
                                        <li key={index}>
                                            <a href="/collection" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="border-t border-gray-700 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            {/* Trust Features */}
                            <div className="flex flex-wrap justify-center gap-6">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Truck className="w-5 h-5 text-green-400" />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Shield className="w-5 h-5 text-blue-400" />
                                    <span>Secure Payment</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Clock className="w-5 h-5 text-yellow-400" />
                                    <span>24/7 Support</span>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="flex justify-center gap-4">
                                {paymentMethods.map((method, index) => (
                                    <div key={index} className="w-12 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                ))}
                            </div>

                            {/* Security Badge */}
                            <div className="text-center md:text-right">
                                <div className="inline-flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                                    <Shield className="w-4 h-4 text-green-400" />
                                    <span className="text-sm text-gray-400">100% Secure Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 bg-gray-900">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-gray-400 text-sm text-center md:text-left z-10">
                                © 2025 ForeverStyle. All rights reserved. Made with <Heart className="w-4 h-4 text-red-500 inline fill-current" /> by foreverstyle
                            </p>
                            <div className="flex gap-6 text-sm text-gray-400 z-10">
                                <Link to={'/'} className="hover:text-white transition-colors">Privacy Policy</Link>
                                <Link to={'/'} className="hover:text-white transition-colors">Terms of Service</Link>
                                <Link to={'/'} className="hover:text-white transition-colors">Cookies</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;