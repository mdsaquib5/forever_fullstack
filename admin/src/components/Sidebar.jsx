import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Plus,
    List,
    ShoppingCart,
    ChevronLeft,
    ChevronRight,
    Home,
} from 'lucide-react';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        {
            path: '/add',
            icon: Plus,
            label: 'Add Items',
            description: 'Add new products'
        },
        {
            path: '/list',
            icon: List,
            label: 'List Items',
            description: 'Manage products'
        },
        {
            path: '/orders',
            icon: ShoppingCart,
            label: 'Orders',
            description: 'View all orders'
        }
    ];

    return (
        <div className={`bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700/50 min-h-screen transition-all duration-500 ${isCollapsed ? 'w-20' : 'w-80'} relative shadow-2xl`}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-8 w-6 h-6 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-700/50">
                <div className={`flex items-center gap-3 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Home className="w-6 h-6 text-white" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
                            <p className="text-xs text-gray-400 mt-1">Management Panel</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="p-4 space-y-2">
                {menuItems.map((item, index) => {
                    const IconComponent = item.icon;
                    
                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${isActive
                                    ? 'bg-gradient-to-r from-red-600/20 to-pink-600/20 border-l-4 border-red-500 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50 border-l-4 border-transparent'
                                } ${isCollapsed ? 'justify-center' : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Active Indicator */}
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10"></div>
                                    )}

                                    {/* Icon */}
                                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                                        <IconComponent className={`w-6 h-6 ${isActive ? 'text-red-400' : 'text-current'}`} />
                                    </div>

                                    {/* Text Content */}
                                    {!isCollapsed && (
                                        <div className="relative z-10 flex-1">
                                            <p className="font-semibold text-sm transition-colors duration-300">
                                                {item.label}
                                            </p>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 mt-1">
                                                {item.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Hover Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </div>

            {/* Bottom Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Admin Info */}
                {!isCollapsed && (
                    <div className="mt-4 p-4 bg-gray-800/50 rounded-2xl border border-gray-700/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl flex items-center justify-center">
                                <span className="text-white text-sm font-bold">A</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white">Administrator</p>
                                <p className="text-xs text-gray-400">Super Admin</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;