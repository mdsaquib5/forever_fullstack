import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/asset/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    // Getting product id from url
    const {productId} = useParams();
    const {products, currency, addToCart} = useContext(ShopContext);
    // Product Data
    const [productData, setProductData] = useState(false);
    // Product Image
    const [image, setImage] = useState('');
    // Product Size
    const [size, setSize] = useState('');

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
    }, [productId])
    
    
  return productData ? (
    <>
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {/* Product Image */}
                        {
                            productData.image.map((item, index) => (
                                <img onClick={() => setImage(item)} key={index} src={item.url} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                            ))
                        }
                    </div>
                    {/* Product Image */}
                    <div className='w-full sm:w-[80%]'>
                        <img src={image.url} alt="" className='w-full h-auto object-cover' />
                    </div>
                </div>
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className=' flex items-center gap-1 mt-2'>
                        {/* Product Rating */}
                        <img src={assets.star_icon} alt="" className='w-3.5' />
                        <img src={assets.star_icon} alt="" className='w-3.5' />
                        <img src={assets.star_icon} alt="" className='w-3.5' />
                        <img src={assets.star_icon} alt="" className='w-3.5' />
                        <img src={assets.star_dull_icon} alt="" className='w-3.5' />
                        <p className='pl-2'>4.5</p>
                    </div>
                    {/* Product Price */}
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    {/* Product Description */}
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                    {/* Product Size */}
                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>
                        <div className='flex gap-2'>
                            {
                                // Map product size
                                productData.sizes.map((item, index) => (
                                    <button onClick={() => setSize(item)} key={index} className={`border border-gray-100 py-2 px-4 bg-gray-100 cursor-pointer ${size === item ? 'border-orange-500' : ''}`}>{item}</button>
                                ))
                            }
                        </div>
                    </div>
                    {/* Add to Cart Button */}
                    <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>Add to Cart</button>
                    {/* Product Details */}
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original Product</p>
                        <p>Cash on delivery available on this product</p>
                        <p>Easy return & exchange policy within 7 days</p>
                    </div>
                </div>
            </div>
            {/* Review */}
            <div className='mt-20'>
                <div className='flex'>
                    <div className='border px-5 py-3 text-sm border-gray-200'>Description</div>
                    <div className='border px-5 py-3 text-sm border-gray-200'>Reviews (122)</div>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 border-gray-200'>
                    <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                    <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                </div>
            </div>
            {/* Display related products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    </>
  ) : (
    <div>Loading...</div>
  )
}

export default Product;