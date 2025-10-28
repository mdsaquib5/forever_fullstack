import React, { useState } from 'react';
import { assets } from '../assets/asset/assets';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageCircle,
    Users,
    Building,
    ArrowRight,
    CheckCircle
} from 'lucide-react';
import Title2 from '../components/Title2';
import Title from '../components/Title';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
            alert('Thank you for your message! We\'ll get back to you soon.');
        }, 2000);
    };

    const contactMethods = [
        {
            icon: MapPin,
            title: "Visit Our Store",
            details: ["54709 Willms Station", "Suite 350, Washington, USA"],
            color: "from-blue-500 to-cyan-500",
            link: "#"
        },
        {
            icon: Phone,
            title: "Call Us",
            details: ["(415) 555-0132", "(415) 555-0133"],
            color: "from-green-500 to-emerald-500",
            link: "tel:4155550132"
        },
        {
            icon: Mail,
            title: "Email Us",
            details: ["admin@forever.com", "support@forever.com"],
            color: "from-purple-500 to-pink-500",
            link: "mailto:admin@forever.com"
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: ["Mon - Fri: 9:00 AM - 8:00 PM", "Sat - Sun: 10:00 AM - 6:00 PM"],
            color: "from-orange-500 to-red-500",
            link: "#"
        }
    ];

    const faqs = [
        {
            question: "How can I track my order?",
            answer: "You can track your order using the tracking link sent to your email or through your account dashboard."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all items in original condition with tags attached."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
        },
        {
            question: "How can I contact customer service?",
            answer: "You can reach us via phone, email, or live chat during business hours. We typically respond within 24 hours."
        }
    ];

    return (
        <>
            <div className="bg-gradient-to-br from-gray-50 to-white">
                {/* Hero Section */}
                <section className="py-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-100 to-pink-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-12">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <Title2 text="Get In Touch" />
                            </div>
                            <Title2 text1="Contact" text2="Us" />
                            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                We're here to help! Whether you have questions, feedback, or need assistance,
                                our team is ready to provide you with exceptional support.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.link}
                                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group text-center"
                                >
                                    <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                                        <method.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{method.title}</h3>
                                    {method.details.map((detail, idx) => (
                                        <p key={idx} className="text-gray-600 mb-2 last:mb-0">{detail}</p>
                                    ))}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Contact Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                            {/* Contact Form */}
                            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <MessageCircle className="w-6 h-6 text-red-600" />
                                    <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                            placeholder="What's this regarding?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                                            placeholder="Tell us how we can help you..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3 group"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Sending Message...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Store Information & Image */}
                            <div className="space-y-8">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src={assets.contact_img}
                                        alt="Our Store"
                                        className="w-full h-80 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold mb-2">Visit Our Flagship Store</h3>
                                        <p className="text-white/90">Experience fashion in person</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Building className="w-6 h-6 text-red-600" />
                                        <h3 className="text-2xl font-bold text-gray-900">Store Information</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                                            <p className="text-gray-600">54709 Willms Station<br />Suite 350, Washington, USA</p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                                            <p className="text-gray-600">Tel: (415) 555-0132<br />Email: admin@forever.com</p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Hours</h4>
                                            <p className="text-gray-600">
                                                Monday - Friday: 9:00 AM - 8:00 PM<br />
                                                Saturday - Sunday: 10:00 AM - 6:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Careers Section */}
                                {/* <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-8 text-white">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Users className="w-6 h-6" />
                                        <h3 className="text-2xl font-bold">Careers at Forever</h3>
                                    </div>
                                    <p className="text-red-100 leading-relaxed">
                                        Join our passionate team and be part of revolutionizing online fashion retail.
                                        Learn more about our teams and job openings.
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <Title2 text1="Frequently" text2="Asked Questions" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Contact;