import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    Package,
    Trash2,
    Eye,
    Search,
    Filter,
    RefreshCw,
    AlertTriangle,
    Star
} from 'lucide-react';
import { backendUrl } from '../config/const';

export const currency = "₹";

const List = ({ token }) => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchList = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${backendUrl}/api/product/list`);
              console.log(response.data.products);
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
            //   setList(response.data.products);
            toast.success('Product list fetched successfully');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    const removeProduct = async (id) => {
        console.log("Remove product id", id);
        try {
            const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });
            if (response.data.success) {
                toast.success('Product deleted successfully');
                // after delete the product from the list
                await fetchList();
                setDeleteConfirm(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // Filter products based on search and category
    const filteredProducts = list.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(list.map(item => item.category))];

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
                                <span className="text-sm font-semibold tracking-wider">PRODUCT MANAGEMENT</span>
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
                                    <p className="text-sm text-gray-600">Total Products</p>
                                    <p className="text-2xl font-bold text-gray-900">{list.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Active Products</p>
                                    <p className="text-2xl font-bold text-gray-900">{list.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <Eye className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Bestsellers</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {list.filter(item => item.bestseller).length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <Star className="w-6 h-6 text-yellow-600 fill-current" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Categories</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {new Set(list.map(item => item.category)).size}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <Filter className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Search Bar */}
                            <div className="flex-1 w-full lg:max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="flex items-center gap-4">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>

                                {/* Refresh Button */}
                                <button
                                    onClick={fetchList}
                                    disabled={isLoading}
                                    className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                                <div className="col-span-5 lg:col-span-4">PRODUCT</div>
                                <div className="hidden lg:block col-span-2">CATEGORY</div>
                                <div className="hidden lg:block col-span-2">PRICE</div>
                                <div className="hidden lg:block col-span-2">STATUS</div>
                                <div className="col-span-7 lg:col-span-2 text-right">ACTIONS</div>
                            </div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-100">
                            {isLoading ? (
                                // Loading State
                                <div className="p-12 text-center">
                                    <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
                                    <p className="text-gray-600">Loading products...</p>
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                // Empty State
                                <div className="p-12 text-center">
                                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                                    <p className="text-gray-600">
                                        {searchTerm || selectedCategory !== 'All'
                                            ? 'Try adjusting your search or filters'
                                            : 'No products available in your inventory'
                                        }
                                    </p>
                                </div>
                            ) : (
                                // Products List
                                filteredProducts.map((item, index) => (
                                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-300">
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            {/* Product Info */}
                                            <div className="col-span-5 lg:col-span-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <img
                                                            src={item.image[0].url}
                                                            className="w-16 h-16 object-cover rounded-2xl shadow-sm"
                                                            alt={item.name}
                                                        />
                                                        {item.bestseller && (
                                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                                                <Star className="w-3 h-3 text-white fill-current" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                                                        <p className="text-sm text-gray-500 truncate">{item.description}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Category - Desktop */}
                                            <div className="hidden lg:block col-span-2">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {item.category}
                                                </span>
                                            </div>

                                            {/* Price - Desktop */}
                                            <div className="hidden lg:block col-span-2">
                                                <span className="text-lg font-bold text-gray-900">
                                                    {currency}{item.price}
                                                </span>
                                            </div>

                                            {/* Status - Desktop */}
                                            <div className="hidden lg:block col-span-2">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${item.bestseller
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {item.bestseller ? 'Bestseller' : 'Active'}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="col-span-7 lg:col-span-2">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setDeleteConfirm(item._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile View */}
                                        <div className="lg:hidden mt-4 pt-4 border-t border-gray-100">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Category:</span>
                                                    <span className="ml-2 font-medium">{item.category}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Price:</span>
                                                    <span className="ml-2 font-bold text-gray-900">{currency}{item.price}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Status:</span>
                                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${item.bestseller
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-green-100 text-green-800'
                                                        }`}>
                                                        {item.bestseller ? 'Bestseller' : 'Active'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Delete Product</h3>
                                <p className="text-gray-600 text-sm">This action cannot be undone</p>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-6">
                            Are you sure you want to delete this product? All product data will be permanently removed.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => removeProduct(deleteConfirm)}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default List;