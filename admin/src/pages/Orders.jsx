import React, { useState, useEffect } from 'react';
import { backendUrl, currency } from "../config/const";
import axios from 'axios';
import { toast } from 'react-toastify';
import {assets} from '../assets/assets';
import { 
    Package, 
    Truck, 
    User, 
    MapPin, 
    Phone, 
    Calendar,
    CreditCard,
    DollarSign,
    Filter,
    RefreshCw,
    MoreVertical,
    CheckCircle,
    Clock,
    Package2,
    ShoppingCart
} from 'lucide-react';

const Orders = ({token}) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [expandedOrder, setExpandedOrder] = useState(null);

    const fetchOrders = async () => {
        if (!token) {
            return null;
        }
        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/order/list`, {}, {headers: {token} });
            // console.log(response.data);

            if (response.data.success) {
                setOrders(response.data.orders.reverse());
            }else{
                toast.error(response.data.message);
            }

            // const data = await response.json();
            // setOrders(data.orders);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const statusHandler = async (orderId, event) => {
        try {
            const response = await axios.post(`${backendUrl}/api/order/status`, {orderId, status:event.target.value}, {headers: {token} });
            if (response.data.success) {
                await fetchOrders();
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [token]);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Out for delivery':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Packing':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Order Placed':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Delivered':
                return <CheckCircle className="w-4 h-4" />;
            case 'Shipped':
            case 'Out for delivery':
                return <Truck className="w-4 h-4" />;
            case 'Packing':
                return <Package2 className="w-4 h-4" />;
            case 'Order Placed':
                return <ShoppingCart className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const statusOptions = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];
    const allStatuses = ['All', ...statusOptions];

    const filteredOrders = selectedStatus === 'All' 
        ? orders 
        : orders.filter(order => order.status === selectedStatus);

    const getPaymentStatusColor = (payment) => {
        return payment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    return (
        <>
            <div className="min-h-screen from-gray-50 to-white py-2">
                <div>
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                            <div className="flex items-center gap-2 text-red-600">
                                <Package className="w-5 h-5" />
                                <span className="text-sm font-semibold tracking-wider">ORDER MANAGEMENT</span>
                                <Package className="w-5 h-5" />
                            </div>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {orders.filter(order => order.status === 'Order Placed').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">In Transit</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {orders.filter(order => ['Shipped', 'Out for delivery'].includes(order.status)).length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <Truck className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Delivered</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {orders.filter(order => order.status === 'Delivered').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Status Filter */}
                                <div className="flex items-center gap-3">
                                    <Filter className="w-5 h-5 text-gray-400" />
                                    <select 
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                    >
                                        {allStatuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Refresh Button */}
                            <button 
                                onClick={fetchOrders}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                                Refresh Orders
                            </button>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {isLoading ? (
                            // Loading State
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                                <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
                                <p className="text-gray-600">Loading orders...</p>
                            </div>
                        ) : filteredOrders.length === 0 ? (
                            // Empty State
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                                <p className="text-gray-600">
                                    {selectedStatus !== 'All' 
                                        ? `No orders with status "${selectedStatus}"` 
                                        : 'No orders available'
                                    }
                                </p>
                            </div>
                        ) : (
                            // Orders List
                            filteredOrders.map((order, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="p-6">
                                        {/* Order Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl flex items-center justify-center">
                                                    <Package className="w-6 h-6 text-red-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</h3>
                                                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)} flex items-center gap-2`}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status}
                                                </span>
                                                <button 
                                                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                                                >
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Order Details */}
                                        <div className="grid lg:grid-cols-3 gap-6">
                                            {/* Customer & Address */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <User className="w-5 h-5 text-gray-400" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {order.address.firstName} {order.address.lastName}
                                                        </p>
                                                        <p className="text-sm text-gray-500">{order.address.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                                                    <div className="text-sm text-gray-600">
                                                        <p>{order.address.street}</p>
                                                        <p>{order.address.city}, {order.address.state}</p>
                                                        <p>{order.address.zipcode}, {order.address.country}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div className="space-y-3">
                                                <p className="font-medium text-gray-900 flex items-center gap-2">
                                                    <ShoppingCart className="w-4 h-4" />
                                                    Order Items ({order.items.length})
                                                </p>
                                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                                    {order.items.map((item, itemIndex) => (
                                                        <div key={itemIndex} className="flex items-center gap-3 text-sm">
                                                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                <span className="text-xs font-medium text-gray-600">{item.quantity}x</span>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-gray-900 truncate">{item.name}</p>
                                                                <p className="text-gray-500 text-xs">Size: {item.size}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Payment & Actions */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600">Total Amount:</span>
                                                    <span className="text-lg font-bold text-gray-900 flex items-center gap-1">
                                                        <DollarSign className="w-4 h-4" />
                                                        {currency}{order.amount}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600">Payment:</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment)} flex items-center gap-1`}>
                                                        <CreditCard className="w-3 h-3" />
                                                        {order.payment ? 'Paid' : 'Pending'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-600">Method:</span>
                                                    <span className="text-sm font-medium text-gray-900 capitalize">
                                                        {order.paymentMethod}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Update - Always Visible */}
                                        <div className="mt-6 pt-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-700">Update Status:</span>
                                                <select 
                                                    value={order.status} 
                                                    onChange={(e) => statusHandler(order._id, e)} 
                                                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm font-medium"
                                                >
                                                    {statusOptions.map(status => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;