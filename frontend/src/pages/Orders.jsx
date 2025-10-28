import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { Package, Calendar, CreditCard, Truck, CheckCircle, Clock, RefreshCw, MapPin } from 'lucide-react';

const Orders = () => {
    const { currency, backendUrl, token } = useContext(ShopContext);

    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleOrders, setVisibleOrders] = useState(4);

    const loadOrderData = async () => {
        try {
            if (!token) {
                return null;
            }

            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/order/userOrders`, {}, { headers: { token } });
            // console.log(response.data);
            // setOrderData(response.data.orders);
            if (response.data.success) {
                let allOrdersItem = [];
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status;
                        item['date'] = order.date;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        allOrdersItem.push(item);
                    });
                });
                console.log(allOrdersItem);
                setOrderData(allOrdersItem.reverse());
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadOrderData();
    }, [token]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'shipped':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'processing':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'pending':
                return 'text-orange-600 bg-orange-50 border-orange-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return <CheckCircle className="w-4 h-4" />;
            case 'shipped':
                return <Truck className="w-4 h-4" />;
            case 'processing':
                return <RefreshCw className="w-4 h-4" />;
            case 'pending':
                return <Clock className="w-4 h-4" />;
            default:
                return <Package className="w-4 h-4" />;
        }
    };

    const getPaymentIcon = (method) => {
        switch (method?.toLowerCase()) {
            case 'credit card':
                return <CreditCard className="w-4 h-4" />;
            case 'paypal':
                return 'PP';
            case 'cash on delivery':
                return <MapPin className="w-4 h-4" />;
            default:
                return <CreditCard className="w-4 h-4" />;
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <div className="text-center mb-12">

                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            My
                            <span className="block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                Orders
                            </span>
                        </h1>
                        <p className="text-base text-gray-600 max-w-2xl mx-auto">
                            Track your orders and view your complete purchase history
                        </p>
                    </div>

                    {/* Orders Content */}
                    <div className="max-w-6xl mx-auto">
                        {isLoading ? (
                            // Loading State
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <RefreshCw className="w-8 h-8 text-red-600 animate-spin" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Loading Your Orders</h3>
                                <p className="text-gray-600">Please wait while we fetch your order history...</p>
                            </div>
                        ) : orderData.length === 0 ? (
                            // Empty State
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Package className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    You haven't placed any orders yet. Start shopping to see your orders here.
                                </p>
                                <button
                                    onClick={() => window.location.href = '/collection'}
                                    className="bg-gradient-to-r cursor-pointer from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            // Orders List
                            <div className="space-y-6">
                                {orderData.slice(0, visibleOrders).map((item, index) => (
                                    <div key={index} className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 overflow-hidden">
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                                {/* Product Image & Info */}
                                                <div className="lg:col-span-7">
                                                    <div className="flex items-start gap-4">
                                                        <div className="relative">
                                                            <img
                                                                src={item.image[0].url}
                                                                alt={item.name}
                                                                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl shadow-md"
                                                            />
                                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                                {item.quantity}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                                                                {item.name}
                                                            </h3>
                                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium">Price:</span>
                                                                    <span className="text-red-600 font-bold">{currency}{item.price}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium">Quantity:</span>
                                                                    <span>{item.quantity}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium">Size:</span>
                                                                    <span className="bg-gray-100 px-2 py-1 rounded-lg font-medium">{item.size}</span>
                                                                </div>
                                                            </div>

                                                            {/* Order Meta Info */}
                                                            <div className="flex flex-wrap gap-4 text-sm">
                                                                <div className="flex items-center gap-2 text-gray-500">
                                                                    <Calendar className="w-4 h-4" />
                                                                    <span>{new Date(item.date).toDateString()}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-gray-500">
                                                                    <CreditCard className="w-4 h-4" />
                                                                    <span className="capitalize">{item.paymentMethod}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Status & Actions */}
                                                <div className="lg:col-span-5">
                                                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center justify-between gap-4">
                                                        {/* Status Badge */}
                                                        <div className="flex items-center gap-3">
                                                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-semibold text-sm ${getStatusColor(item.status)}`}>
                                                                {getStatusIcon(item.status)}
                                                                <span className="capitalize">{item.status}</span>
                                                            </div>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={loadOrderData}
                                                                className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-gray-300"
                                                            >
                                                                <Truck className="w-4 h-4" />
                                                                Track Order
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Total */}
                                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Order Total:</span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    {currency}{(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* View All Orders Button */}
                        {orderData.length > visibleOrders && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => setVisibleOrders(prev => prev + 4)}
                                    className="cursor-pointer bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    View All Orders ({orderData.length - visibleOrders})
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders;