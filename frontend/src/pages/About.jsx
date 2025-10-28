import React from 'react';
import { assets } from '../assets/asset/assets';
import {
    Award,
    Users,
    Target,
    Heart,
    Shield,
    Truck,
    Clock,
    CheckCircle,
    Globe,
    TrendingUp
} from 'lucide-react';
import Title2 from '../components/Title2';

const About = () => {
    const stats = [
        { number: "10K+", label: "Happy Customers", icon: Users },
        { number: "500+", label: "Products", icon: Award },
        { number: "50+", label: "Brands", icon: Globe },
        { number: "24/7", label: "Support", icon: Clock }
    ];

    const values = [
        {
            icon: Heart,
            title: "Customer First",
            description: "Our customers are at the heart of everything we do. Their satisfaction drives our innovation.",
            color: "from-red-500 to-pink-500"
        },
        {
            icon: Shield,
            title: "Quality Assurance",
            description: "Every product undergoes rigorous quality checks to ensure excellence and durability.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Target,
            title: "Innovation",
            description: "We constantly evolve to bring you the latest trends and cutting-edge fashion.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Users,
            title: "Community",
            description: "Building a fashion community that inspires and empowers through style.",
            color: "from-purple-500 to-pink-500"
        }
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            description: "Passionate about revolutionizing online fashion retail."
        },
        {
            name: "Michael Chen",
            role: "Head of Design",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            description: "Curating trends that define modern elegance."
        },
        {
            name: "Emily Rodriguez",
            role: "Customer Success",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            description: "Ensuring every customer feels valued and heard."
        }
    ];

    return (
        <>
            <div className="bg-gradient-to-br from-gray-50 to-white">
                {/* Hero Section */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-100 to-pink-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-10">
                            <Title2 text1="About" text2="ForeverStyle" />
                            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Where fashion meets passion, and quality meets style. We're dedicated to bringing you
                                the finest collections that inspire confidence and express individuality.
                            </p>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                    <div className="text-gray-600 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <img
                                    src={assets.about_img}
                                    alt="Our Story"
                                    className="w-full rounded-3xl shadow-2xl"
                                />
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold text-gray-900">Our Journey</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    ForeverStyle was born out of a passion for innovation and a desire to revolutionize
                                    the way people shop online. Our journey began with a simple idea: to provide a platform
                                    where customers can easily discover, explore, and purchase a wide range of products
                                    from the comfort of their homes.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Since our inception, we've worked tirelessly to curate a diverse selection of
                                    high-quality products that cater to every taste and preference. From fashion and
                                    beauty to electronics and home essentials, we offer an extensive collection sourced
                                    from trusted brands and suppliers.
                                </p>

                                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <Target className="w-5 h-5 text-red-600" />
                                        Our Mission
                                    </h3>
                                    <p className="text-gray-700">
                                        Our mission at ForeverStyle is to empower customers with choice, convenience, and confidence.
                                        We're dedicated to providing a seamless shopping experience that exceeds expectations,
                                        from browsing and ordering to delivery and beyond.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <Title2 text1="Our Core" text2="Values" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                                        <value.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <Title2 text1="Why Choose" text2="ForeverStyle" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-6">
                                    <Award className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    We meticulously select and vet each product to ensure it meets our stringent quality standards.
                                    Every item in our collection is chosen for its durability, style, and value.
                                </p>
                                <ul className="space-y-2">
                                    {['Premium Materials', 'Quality Testing', 'Brand Verification', 'Customer Reviews'].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mb-6">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Convenience</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
                                    Enjoy seamless browsing, secure payments, and fast delivery.
                                </p>
                                <ul className="space-y-2">
                                    {['Easy Returns', 'Fast Shipping', 'Secure Payments', 'Mobile App'].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Exceptional Service</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Our team of dedicated professionals is here to assist you every step of the way,
                                    ensuring your satisfaction is our top priority.
                                </p>
                                <ul className="space-y-2">
                                    {['24/7 Support', 'Expert Stylists', 'Personal Shopping', 'Style Advice'].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default About;