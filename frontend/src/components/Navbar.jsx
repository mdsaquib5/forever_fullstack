import React, { useState, useContext, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { Search, ShoppingCart, User, Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, setToken, setCartItems, navigate, token } = useContext(ShopContext);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (visible) {
            document.body.style.overflowX = 'hidden';
        } else {
            document.body.style.overflowX = 'unset';
        }

        // Cleanup function
        return () => {
            document.body.style.overflowX = 'hidden';
        };
    }, [visible]);

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        navigate('/login');
        toast.success("User Logout successfully");
    }

    console.log("token is", token);

    return (
        <>
            {/* Top Announcement Bar */}
            <div className='bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 px-4'>
                <div className='container mx-auto text-center text-sm font-medium'>
                    🎉 Get 50% OFF on your first order! Use code: <span className='font-bold'>WELCOME50</span>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className='sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'>
                <div className='container mx-auto px-4'>
                    <div className='flex items-center justify-between h-16'>
                        {/* Logo */}
                        <Link to={'/'} className='flex items-center'>
                            <div className='text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent'>
                                ForeverStyle
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className='hidden lg:flex items-center space-x-8'>
                            <NavLink
                                to={'/'}
                                className={({ isActive }) =>
                                    `relative font-medium transition-all duration-300 group ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                                    }`
                                }
                            >
                                Home
                                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-pink-600 transition-all duration-300 group-hover:w-full'></span>
                            </NavLink>
                            <NavLink
                                to={'/collection'}
                                className={({ isActive }) =>
                                    `relative font-medium transition-all duration-300 group ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                                    }`
                                }
                            >
                                Collection
                                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-pink-600 transition-all duration-300 group-hover:w-full'></span>
                            </NavLink>
                            <NavLink
                                to={'/about'}
                                className={({ isActive }) =>
                                    `relative font-medium transition-all duration-300 group ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                                    }`
                                }
                            >
                                About
                                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-pink-600 transition-all duration-300 group-hover:w-full'></span>
                            </NavLink>
                            <NavLink
                                to={'/contact'}
                                className={({ isActive }) =>
                                    `relative font-medium transition-all duration-300 group ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                                    }`
                                }
                            >
                                Contact
                                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-pink-600 transition-all duration-300 group-hover:w-full'></span>
                            </NavLink>
                        </div>

                        {/* Right Side Icons */}
                        <div className='flex items-center space-x-6'>
                            {/* Search Icon */}
                            <button
                                onClick={() => setShowSearch(true)}
                                className='p-2 text-gray-600 hover:text-red-600 transition-colors duration-300 hover:bg-gray-50 rounded-full'
                            >
                                <Search size={20} />
                            </button>

                            {/* User Profile with Dropdown */}

                            <div className='relative group'>
                                <button
                                    onClick={() => token ? null : navigate('/login')}
                                    className='p-2 text-gray-600 hover:text-red-600 transition-colors duration-300 hover:bg-gray-50 rounded-full'
                                >
                                    <User size={20} />
                                </button>

                                {/* Dropdown Menu */}
                                {token && (
                                    <div className='absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                                        <div className='bg-white shadow-xl rounded-2xl border border-gray-100 py-3 px-4 min-w-48'>
                                            <div className='flex flex-col space-y-2'>
                                                <button className='text-left px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'>
                                                    My Profile
                                                </button>
                                                <button
                                                    onClick={() => navigate('/orders')}
                                                    className='text-left px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                                                >
                                                    Orders
                                                </button>
                                                <button
                                                    onClick={logout}
                                                    className='text-left px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Shopping Cart */}
                            <Link
                                to={'/cart'}
                                className='relative p-2 text-gray-600 hover:text-red-600 transition-colors duration-300 hover:bg-gray-50 rounded-full'
                            >
                                <ShoppingCart size={20} />
                                {getCartCount() > 0 && (
                                    <span className='absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full'>
                                        {getCartCount()}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setVisible(true)}
                                className='lg:hidden p-2 text-gray-600 hover:text-red-600 transition-colors duration-300'
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Sidebar Menu */}
                <div className={`fixed top-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${visible ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div className='flex flex-col h-svh'>
                        {/* Header */}
                        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                            <div className='text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent'>
                                Menu
                            </div>
                            <button
                                onClick={() => setVisible(false)}
                                className='p-2 text-gray-400 hover:text-red-600 transition-colors duration-300'
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className='flex-1 p-6'>
                            <div className='flex flex-col space-y-4'>
                                <NavLink
                                    to={'/'}
                                    onClick={() => setVisible(false)}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-600 border border-red-100'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                                        }`
                                    }
                                >
                                    <span className='font-medium'>Home</span>
                                    <ChevronRight size={16} className='text-gray-400' />
                                </NavLink>
                                <NavLink
                                    to={'/collection'}
                                    onClick={() => setVisible(false)}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-600 border border-red-100'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                                        }`
                                    }
                                >
                                    <span className='font-medium'>Collection</span>
                                    <ChevronRight size={16} className='text-gray-400' />
                                </NavLink>
                                <NavLink
                                    to={'/about'}
                                    onClick={() => setVisible(false)}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-600 border border-red-100'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                                        }`
                                    }
                                >
                                    <span className='font-medium'>About</span>
                                    <ChevronRight size={16} className='text-gray-400' />
                                </NavLink>
                                <NavLink
                                    to={'/contact'}
                                    onClick={() => setVisible(false)}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-600 border border-red-100'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                                        }`
                                    }
                                >
                                    <span className='font-medium'>Contact</span>
                                    <ChevronRight size={16} className='text-gray-400' />
                                </NavLink>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className='p-6 border-t border-gray-100'>
                            <div className='text-center text-gray-500 text-sm'>
                                © 2024 ForeverStyle. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Enhanced Overlay with Dark Blur Effect */}
            {visible && (
                <div
                    className='fixed inset-0 backdrop-blur-xs z-40 lg:hidden'
                    onClick={() => setVisible(false)}
                ></div>
            )}
        </>
    )
}

export default Navbar;