import React, { useContext, useState } from 'react';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../config/const';
import {
    CreditCard,
    Truck,
    Wallet,
    MapPin,
    User,
    Mail,
    Phone,
    Home,
    Building2,
    Globe,
    CheckCircle,
    Lock,
    MapPinned
} from 'lucide-react';
import Title2 from '../components/Title2';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { token, cartItems, getCartAmount, deliveryFee, products, setCartItems } = useContext(ShopContext);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Create some states for form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    // Create a function to handle form changes
    const onchangeHandler = (e) => {
        const { name, value } = e.target;
        // Update the form data state
        setFormData(data => ({ ...data, [name]: value }));
    };


    // Create a function to handle razorpay payment
    const initPay = (order) => {
        const options = {
            key: "rzp_test_RXD61QMWqsvwRO",
            amount: order.amount,
            currency: order.currency,
            name: "Order Payment",
            description: "Order Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response);
                try {
                    const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, { headers: { token } });
                    console.log(data.success);
                    if (data.success) {
                        navigate('/orders');
                        setCartItems({});
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            },
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    // Create a function to handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // console.log(formData);
        setIsSubmitting(true);

        try {
            let orderItems = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            // console.log(orderItems);
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + deliveryFee
            }
            switch (method) {
                // Api calls for COD
                case 'cod':
                    const responseCOD = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
                    // console.log(responseCOD.data.success);
                    if (responseCOD.data.success) {
                        setCartItems({});
                        navigate('/orders');
                    } else {
                        toast.error(responseCOD.data.message);
                    }
                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } });
                    // console.log(responseRazorpay.data.success);
                    if (responseRazorpay.data.success) {
                        // console.log(responseRazorpay.data.order);
                        initPay(responseRazorpay.data.order);
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            toast.error("Unknown User! Please login first");
            navigate('/login');
        } finally {
            setIsSubmitting(false);
        }
    };

    const paymentMethods = [
        {
            id: 'cod',
            name: 'Cash on Delivery',
            icon: Wallet,
            description: 'Pay when you receive your order',
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 'razorpay',
            name: 'Razorpay',
            icon: CreditCard,
            description: 'Secure online payment',
            color: 'from-blue-500 to-cyan-500'
        }
    ];

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <Title2 text1="Place" text2="Your Order" />
                        <p className="text-base text-gray-600 max-w-2xl mx-auto">
                            Complete your purchase with secure payment and delivery information
                        </p>
                    </div>

                    <form onSubmit={onSubmitHandler} className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                        {/* Left Column - Delivery Information */}
                        <div className="space-y-8">
                            {/* Delivery Information Card */}
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <MapPin className="w-6 h-6 text-red-600" />
                                    <h2 className="text-2xl font-bold text-gray-900">Delivery Information</h2>
                                </div>

                                <div className="space-y-6">
                                    {/* Name Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter first name"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={onchangeHandler}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter last name"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={onchangeHandler}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter email address"
                                            name="email"
                                            value={formData.email}
                                            onChange={onchangeHandler}
                                            required
                                        />
                                    </div>

                                    {/* Street Address */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Home className="w-4 h-4" />
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter street address"
                                            name="street"
                                            value={formData.street}
                                            onChange={onchangeHandler}
                                            required
                                        />
                                    </div>

                                    {/* City & State */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Building2 className="w-4 h-4" />
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter city"
                                                name="city"
                                                value={formData.city}
                                                onChange={onchangeHandler}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <MapPinned className="w-4 h-4" />
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter state"
                                                name="state"
                                                value={formData.state}
                                                onChange={onchangeHandler}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Zipcode & Country */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Zipcode</label>
                                            <input
                                                type="number"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter zipcode"
                                                name="zipcode"
                                                value={formData.zipcode}
                                                onChange={onchangeHandler}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Globe className="w-4 h-4" />
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter country"
                                                name="country"
                                                value={formData.country}
                                                onChange={onchangeHandler}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Phone className="w-4 h-4" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter phone number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={onchangeHandler}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary & Payment */}
                        <div className="space-y-8">
                            {/* Order Summary */}
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                                <div>
                                    <CartTotal />
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <CreditCard className="w-6 h-6 text-red-600" />
                                    <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                                </div>

                                <div className="space-y-4">
                                    {paymentMethods.map((payment) => (
                                        <div
                                            key={payment.id}
                                            onClick={() => setMethod(payment.id)}
                                            className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${method === payment.id
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 bg-gradient-to-r ${payment.color} rounded-2xl flex items-center justify-center text-white`}>
                                                    <payment.icon className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="font-semibold text-gray-900">{payment.name}</h3>
                                                        {method === payment.id && (
                                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1">{payment.description}</p>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full border-2 ${method === payment.id
                                                        ? 'bg-red-500 border-red-500'
                                                        : 'border-gray-300'
                                                    }`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Security Notice */}
                                <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-200">
                                    <div className="flex items-center gap-3">
                                        <Lock className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="text-sm font-semibold text-green-900">Secure Payment</p>
                                            <p className="text-xs text-green-700">Your payment information is encrypted and secure</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-3 group mt-6"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing Order...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-5 h-5" />
                                            Place Order Securely
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PlaceOrder;