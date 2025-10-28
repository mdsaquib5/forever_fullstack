import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import {
    Star,
    Truck,
    Shield,
    RefreshCw,
    CheckCircle,
    ShoppingCart,
} from 'lucide-react';

const Product = () => {
    // Getting product id from url
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    // Product Data
    const [productData, setProductData] = useState(false);
    // Product Image
    const [image, setImage] = useState('');
    // Product Size
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Fetch product data
    const fetchProductData = () => {
        // Find product
        const product = products.find((item) => item._id === productId);
        // Set product data
        if (product) {
            // Set product data
            setProductData(product);
            console.log("Product is", product);
            // Set product image
            setImage(product.image[0]);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    const handleAddToCart = () => {
        if (!size) {
            // You can add a toast notification here
            alert('Please select a size');
            return;
        }
        for (let i = 0; i < quantity; i++) {
            addToCart(productData._id, size);
        }
        // You can add success toast here
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return productData ? (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-500 mb-8">
                        Home / {productData.category} / {productData.subCategory} / <span className="text-gray-900 font-medium">{productData.name}</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        {/* Product Images Section */}
                        <div className="space-y-6">
                            {/* Main Image */}
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                                <img
                                    src={image.url}
                                    alt={productData.name}
                                    className="w-full h-96 lg:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-4 overflow-x-auto pb-4">
                                {productData.image.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setImage(item)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${image.url === item.url ? 'border-red-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={item.url}
                                            alt={`${productData.name} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info Section */}
                        <div className="space-y-6">
                            {/* Product Header */}
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                                    {productData.name}
                                </h1>

                                {/* Price */}
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-3xl lg:text-4xl font-bold text-red-600">
                                        {currency}{productData.price}
                                    </span>
                                    {productData.originalPrice && (
                                        <span className="text-xl text-gray-400 line-through">
                                            {currency}{productData.originalPrice}
                                        </span>
                                    )}
                                    {productData.originalPrice && (
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                            Save {currency}{(productData.originalPrice - productData.price).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed">
                                {productData.description}
                            </p>

                            {/* Size Selection */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-lg font-semibold text-gray-900">Select Size</label>
                                    <span className="text-sm text-gray-500">Size Guide</span>
                                </div>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                    {productData.sizes.map((item, index) => (
                                        <button
                                            onClick={() => setSize(item)}
                                            key={index}
                                            className={`py-3 px-4 rounded-xl font-semibold text-sm border-2 transition-all duration-300 ${size === item
                                                ? 'border-red-500 bg-red-50 text-red-600 shadow-lg transform scale-105'
                                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md'
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </button>

                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Truck className="w-5 h-5 text-green-500" />
                                    <span className="text-sm">Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Shield className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm">2 Year Warranty</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <RefreshCw className="w-5 h-5 text-purple-500" />
                                    <span className="text-sm">Easy Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-16">
                        {/* Tab Headers */}
                        <div className="flex border-b border-gray-200">
                            <button className="flex-1 py-6 px-8 text-lg font-semibold text-gray-900 border-b-2 border-red-500 transition-colors duration-300">
                                Product Details
                            </button>
                            <button className="flex-1 py-6 px-8 text-lg font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-300">
                                Reviews & Ratings (122)
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Features List */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Features</h3>
                                    <div className="space-y-3">
                                        {['Premium quality materials', 'Expert craftsmanship', 'Comfortable fit', 'Easy to maintain', 'Eco-friendly production'].map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Category</span>
                                            <span className="font-medium text-gray-900">{productData.category}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Type</span>
                                            <span className="font-medium text-gray-900">{productData.subCategory}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Material</span>
                                            <span className="font-medium text-gray-900">Premium</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Care</span>
                                            <span className="font-medium text-gray-900">Washable</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
                </div>
            </div>
        </>
    ) : (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading product details...</p>
            </div>
        </div>
    )
}

export default Product;