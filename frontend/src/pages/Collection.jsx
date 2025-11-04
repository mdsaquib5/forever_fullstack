import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { Filter, SlidersHorizontal, X, Search } from 'lucide-react';
import Title2 from '../components/Title2';

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    // This state is use to show/hide filter sidebar
    const [showFilters, setShowFilters] = useState(false);
    // This state is use to store filtered products
    const [filterProducts, setFilterProducts] = useState([]);

    // These two states is use to store filter sectection data : 
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    // This state is use to store sort type
    const [sortType, setSortType] = useState('relavent');

    // This function is use to toggle category
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setCategory((prev) => [...prev, e.target.value]);
        }
    }

    // This function is use to toggle subcategory
    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setSubCategory((prev) => [...prev, e.target.value]);
        }
    }

    // This function is use to apply filter
    const applyFilter = () => {
        // Copying products array
        let productsCopy = products.slice();

        // Lets create a condition to check if search is not empty
        if (showSearch && search) {
            productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        // Filtering products
        if (category.length > 0) {
            // Filtering products by category
            productsCopy = productsCopy.filter((item) => category.includes(item.category));
        }
        // Filtering products by subcategory
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
        }
        // Setting filtered products
        setFilterProducts(productsCopy);
    }


    const sortProducts = () => {
        // Copying filtered products array
        let fpCopy = filterProducts.slice();
        // Sorting products
        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;
            default:
                applyFilter();
                break;
        }
    }

    // This useEffect is use to apply filter
    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, products]);

    // This useEffect is use to sort products
    useEffect(() => {
        sortProducts();
    }, [sortType]);


    // This useEffect is use to log category and subcategory
    // useEffect(() => {
    //   console.log(category, subCategory);
    // }, [category, subCategory]);

    const clearFilters = () => {
        setCategory([]);
        setSubCategory([]);
    };

    const getActiveFiltersCount = () => {
        return category.length + subCategory.length;
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <Title2 text1="All" text2="Collections" />
                        <p className="text-base text-gray-600 max-w-2xl mx-auto">
                            Discover our complete range of premium fashion collections curated just for you
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filter SideBar - Enhanced */}
                        <div className="lg:w-80">
                            {/* Mobile Filter Header */}
                            <div className="lg:hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-4">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="w-full flex items-center justify-between gap-3 text-gray-700 hover:text-red-600 transition-colors duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <SlidersHorizontal className="w-5 h-5" />
                                        <span className="font-semibold">Filters & Categories</span>
                                        {getActiveFiltersCount() > 0 && (
                                            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                                                {getActiveFiltersCount()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getActiveFiltersCount() > 0 && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); clearFilters(); }}
                                                className="text-xs text-red-600 hover:text-red-700 font-medium"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                </button>
                            </div>

                            {/* Filter Sidebar Content */}
                            <div className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:block ${showFilters ? 'block' : 'hidden lg:block'} transition-all duration-300`}>
                                {/* Sidebar Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <Filter className="w-5 h-5 text-red-600" />
                                        Filters
                                    </h3>
                                    {getActiveFiltersCount() > 0 && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-300"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                {/* Categories Section */}
                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">CATEGORIES</h4>
                                    <div className="space-y-3">
                                        {['Casual', 'Sports', 'Sneaker'].map((cat) => (
                                            <label key={cat} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    value={cat}
                                                    onChange={toggleCategory}
                                                    checked={category.includes(cat)}
                                                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                                                />
                                                <span className="text-gray-700 group-hover:text-gray-900 font-medium flex-1">{cat}</span>
                                                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${category.includes(cat) ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Type Section */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">PRODUCT TYPE</h4>
                                    <div className="space-y-3">
                                        {['Mens', 'Women', 'Kids'].map((type) => (
                                            <label key={type} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    value={type}
                                                    onChange={toggleSubCategory}
                                                    checked={subCategory.includes(type)}
                                                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                                                />
                                                <span className="text-gray-700 group-hover:text-gray-900 font-medium flex-1">{type}</span>
                                                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${subCategory.includes(type) ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Active Filters Display */}
                                {(category.length > 0 || subCategory.length > 0) && (
                                    <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                                        <h5 className="text-sm font-semibold text-red-900 mb-2">Active Filters:</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {category.map((cat) => (
                                                <span key={cat} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                                    {cat}
                                                    <X className="w-3 h-3 cursor-pointer" onClick={() => setCategory(prev => prev.filter(item => item !== cat))} />
                                                </span>
                                            ))}
                                            {subCategory.map((type) => (
                                                <span key={type} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                                    {type}
                                                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSubCategory(prev => prev.filter(item => item !== type))} />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Products Section - Enhanced */}
                        <div className="flex-1">
                            {/* Products Header */}
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-8">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                            Our Collections
                                        </h2>
                                        <p className="text-gray-600">
                                            Showing {filterProducts.length} products
                                            {(category.length > 0 || subCategory.length > 0) && (
                                                <span className="text-red-600 font-medium">
                                                    {' '}({getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} applied)
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    {/* Sort Controls */}
                                    <div className="flex items-center gap-4">
                                        <select
                                            onChange={(e) => setSortType(e.target.value)}
                                            value={sortType}
                                            className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 font-medium"
                                        >
                                            <option value="relavent">Sort by: Most Relevant</option>
                                            <option value="low-high">Sort by: Price Low to High</option>
                                            <option value="high-low">Sort by: Price High to Low</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid */}
                            {filterProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                    {filterProducts.map((item, index) => (
                                        <div key={index} className="group">
                                            <ProductItem item={item} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                        {category.length > 0 || subCategory.length > 0
                                            ? "Try adjusting your filters to see more products."
                                            : "We couldn't find any products matching your criteria."
                                        }
                                    </p>
                                    {(category.length > 0 || subCategory.length > 0) && (
                                        <button
                                            onClick={clearFilters}
                                            className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                                        >
                                            Clear All Filters
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Collection;