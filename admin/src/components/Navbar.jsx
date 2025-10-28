import React, { useState } from 'react';
import {
    LogOut,
    User,
    Shield,
    ChevronDown,
    Search,
    X
} from 'lucide-react';

const Navbar = ({ setToken }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        // You can add a confirmation dialog here if needed
    };

    return (
        <nav className="bg-gray-900 border-b border-gray-700 shadow-2xl backdrop-blur-sm bg-opacity-95">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left Section - Logo & Brand */}
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-center shadow-lg border border-gray-600">
                                <Shield className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold text-white">ForeverStyle</h1>
                                <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Navigation & User Menu */}
                    <div className="flex items-center gap-4">
                        {/* Search Button - Mobile */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors duration-300"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* User Profile & Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-colors duration-300 group"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg flex items-center justify-center shadow-lg border border-gray-500">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-medium text-white">Administrator</p>
                                    <p className="text-xs text-gray-400">Super Admin</p>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800 border border-gray-600 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-sm bg-opacity-95">
                                    {/* Header with Close Button */}
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-white">Administrator</p>
                                                <p className="text-xs text-gray-400 mt-1">admin@foreverstyle.com</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsProfileOpen(false)}
                                            className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-300"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Logout Section */}
                                    <div className="border-t border-gray-700 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-300 flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                                                <LogOut className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Sign Out</p>
                                                <p className="text-xs text-red-400/80">Logout from admin panel</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div className="lg:hidden mt-4 pt-4 border-t border-gray-700">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search dashboard..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;