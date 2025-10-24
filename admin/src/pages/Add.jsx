import React, { useState } from 'react';
import {assets} from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({token}) => {
    // image states
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

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
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

  return (
    <>
        <div>
            <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
                <div>
                    <p className='mb-2'>Upload Image</p>
                    <div className='flex gap-2'>
                        <label htmlFor="image1" className='cursor-pointer'>
                            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} className='w-20' alt="" />
                            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                        </label>
                        <label htmlFor="image2" className='cursor-pointer'>
                            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} className='w-20' alt="" />
                            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                        </label>
                        <label htmlFor="image3" className='cursor-pointer'>
                            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} className='w-20' alt="" />
                            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                        </label>
                        <label htmlFor="image4" className='cursor-pointer'>
                            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} className='w-20' alt="" />
                            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                        </label>
                    </div>
                </div>

                
                <div className='w-full'>
                    <p className='mb-2'>Product Name</p>
                    <input type="text" className='w-full max-w-[500px] px-3 py-2' placeholder='type here' required onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='w-full'>
                    <p className='mb-2'>Product Description</p>
                    <textarea name="" id="" cols="30" rows="4" className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here...' required onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className='flex flex-col sm:flex-row w-full sm:gap-8'>

                    <div>
                        <p className='mb-2'>Product Category</p>
                        <select name="" id="" className='w-full px-3 py-2' onChange={(e) => setCategory(e.target.value)}>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                        </select>
                    </div>
                    <div>
                        <p className='mb-2'>Sub Category</p>
                        <select name="" id="" className='w-full px-3 py-2' onChange={(e) => setSubCategory(e.target.value)}>
                            <option value="topwear">Topwear</option>
                            <option value="bottomwear">Bottomwear</option>
                            <option value="winterwear">Winterwear</option>
                        </select>
                    </div>
                    <div>
                        <p className='mb-2'>Product Price</p>
                        <input className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='20' required onChange={(e) => setPrice(e.target.value)}/>
                    </div>

                </div>

                <div>
                    <p className='mb-2'>Product Sizes</p>
                    <div className='flex gap-3'>
                        <div onClick={ ()=> setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"]) }>
                            <p className={`${sizes.includes("S") ? "bg-pink-100 border-gray-700" : "bg-slate-200 border-gray-50"} border px-3 py-1 cursor-pointer rounded-xs`}>S</p>
                        </div>
                        <div onClick={ ()=> setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"]) }>
                            <p className={`${sizes.includes("M") ? "bg-pink-100 border-gray-700" : "bg-slate-200 border-gray-50"} border px-3 py-1 cursor-pointer rounded-xs`}>M</p>
                        </div>
                        <div onClick={ ()=> setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"]) }>
                            <p className={`${sizes.includes("L") ? "bg-pink-100 border-gray-700" : "bg-slate-200 border-gray-50"} border px-3 py-1 cursor-pointer rounded-xs`}>L</p>
                        </div>
                        <div onClick={ ()=> setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"]) }>
                            <p className={`${sizes.includes("XL") ? "bg-pink-100 border-gray-700" : "bg-slate-200 border-gray-50"} border px-3 py-1 cursor-pointer rounded-xs`}>XL</p>
                        </div>
                        <div onClick={ ()=> setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"]) }>
                            <p className={`${sizes.includes("XXL") ? "bg-pink-100 border-gray-700" : "bg-slate-200 border-gray-50"} border px-3 py-1 cursor-pointer rounded-xs`}>XXL</p>
                        </div>
                    </div>
                </div>

                <div className='flex gap-2 mt-2'>
                    <input type="checkbox" id="bestseller" onChange={()=> setBestseller(prev => !prev)} checked={bestseller} />
                    <label htmlFor="bestseller">Add to bestseller</label>
                </div>

                <div>
                    <button className='py-3 mt-4 bg-black text-white px-6 cursor-pointer'>Add New Product</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default Add;