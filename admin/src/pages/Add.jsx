import React, { useState } from 'react';
import {assets} from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    Upload, 
    Package, 
    DollarSign, 
    Tag, 
    Star, 
    Plus,
    Image,
    Type,
    FileText,
    Grid3X3,
    Check
} from 'lucide-react';

const Add = ({token}) => {
    // image states
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // product states
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('subCategory', subCategory);
            formData.append('bestseller', bestseller);
            formData.append('sizes', JSON.stringify(sizes));

            // image append
            image1 && formData.append('image1', image1);
            image2 && formData.append('image2', image2);
            image3 && formData.append('image3', image3);
            image4 && formData.append('image4', image4);

            // api call
            const response = await axios.post('http://localhost:4000/api/product/add', formData, {
                headers: {token}
            });
            toast.success('Product added successfully');
            console.log(response.data);
            
            // Reset form after successful submission
            setName('');
            setDescription('');
            setPrice('');
            setCategory('Men');
            setSubCategory('Topwear');
            setBestseller(false);
            setSizes([]);
            setImage1(false);
            setImage2(false);
            setImage3(false);
            setImage4(false);
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const toggleSize = (size) => {
        setSizes(prev => 
            prev.includes(size) 
                ? prev.filter(item => item !== size) 
                : [...prev, size]
        );
    };

    const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <>
        <div className="min-h-screen from-gray-50 to-white py-2">
            <div>
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                        <div className="flex items-center gap-2 text-red-600">
                            <Plus className="w-5 h-5" />
                            <span className="text-sm font-semibold tracking-wider">ADD NEW PRODUCT</span>
                            <Plus className="w-5 h-5" />
                        </div>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    </div>
                </div>

                <form onSubmit={onSubmitHandler} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                    {/* Image Upload Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Image className="w-6 h-6 text-red-600" />
                            <h2 className="text-xl font-bold text-gray-900">Product Images</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((num) => {
                                const imageState = [image1, image2, image3, image4][num - 1];
                                const setImage = [setImage1, setImage2, setImage3, setImage4][num - 1];
                                
                                return (
                                    <label 
                                        key={num}
                                        htmlFor={`image${num}`} 
                                        className="group cursor-pointer"
                                    >
                                        <div className={`aspect-square rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
                                            imageState 
                                                ? 'border-green-500 bg-green-50' 
                                                : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50'
                                        }`}>
                                            {imageState ? (
                                                <div className="relative w-full h-full">
                                                    <img 
                                                        src={URL.createObjectURL(imageState)} 
                                                        className="w-full h-full object-cover" 
                                                        alt={`Preview ${num}`} 
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                        <Upload className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-gray-400 group-hover:text-red-500 transition-colors duration-300">
                                                    <Upload className="w-8 h-8 mb-2" />
                                                    <span className="text-sm font-medium">Image {num}</span>
                                                </div>
                                            )}
                                        </div>
                                        <input 
                                            onChange={(e) => setImage(e.target.files[0])} 
                                            type="file" 
                                            id={`image${num}`} 
                                            hidden 
                                            accept="image/*"
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Product Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Type className="w-4 h-4" />
                                Product Name
                            </label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                placeholder="Enter product name" 
                                required 
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        {/* Product Price */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Product Price
                            </label>
                            <input 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                type="number" 
                                placeholder="0.00" 
                                required 
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4" />
                            Product Description
                        </label>
                        <textarea 
                            cols="30" 
                            rows="4" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                            placeholder="Write detailed product description..." 
                            required 
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        ></textarea>
                    </div>

                    {/* Category & Subcategory */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Package className="w-4 h-4" />
                                Product Category
                            </label>
                            <select 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Sub Category
                            </label>
                            <select 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                                onChange={(e) => setSubCategory(e.target.value)}
                                value={subCategory}
                            >
                                <option value="Topwear">Topwear</option>
                                <option value="Bottomwear">Bottomwear</option>
                                <option value="Winterwear">Winterwear</option>
                            </select>
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-8">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-4">
                            <Grid3X3 className="w-4 h-4" />
                            Available Sizes
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {sizeOptions.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => toggleSize(size)}
                                    className={`px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-300 transform hover:scale-105 ${
                                        sizes.includes(size)
                                            ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white border-transparent shadow-lg'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-red-400 hover:text-red-600'
                                    }`}
                                >
                                    {size}
                                    {sizes.includes(size) && (
                                        <Check className="w-4 h-4 inline-block ml-2" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bestseller Toggle */}
                    <div className="mb-8">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input 
                                    type="checkbox" 
                                    id="bestseller" 
                                    onChange={() => setBestseller(prev => !prev)} 
                                    checked={bestseller} 
                                    className="sr-only"
                                />
                                <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                                    bestseller 
                                        ? 'bg-gradient-to-r from-red-600 to-pink-600' 
                                        : 'bg-gray-300 group-hover:bg-gray-400'
                                }`}>
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                                        bestseller ? 'transform translate-x-6' : ''
                                    }`}></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className={`w-5 h-5 ${
                                    bestseller ? 'text-yellow-500 fill-current' : 'text-gray-400'
                                }`} />
                                <span className="font-medium text-gray-700">Mark as Bestseller</span>
                            </div>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-3 min-w-48"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Adding Product...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Add New Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Add;