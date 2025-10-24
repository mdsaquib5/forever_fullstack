import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import {assets} from '../assets/asset/assets';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {backendUrl} from '../config/const';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const {token, cartItems, getCartAmount, deliveryFee, products, setCartItems} = useContext(ShopContext);
    const navigate = useNavigate();

    // Create some states for form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    // Create a function to handle form changes
    const onchangeHandler = (e) => {
        const { name, value } = e.target;
        // Update the form data state
        setFormData( data => ({...data, [name]: value}));
    };


    // Create a function to handle razorpay payment
    const initPay = (order) => {
        const options = {
            key : "rzp_test_RXD61QMWqsvwRO",
            amount : order.amount,
            currency : order.currency,
            name : "Order Payment",
            description : "Order Payment",
            order_id : order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response);
                try {
                    const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, {headers: {token}});
                    console.log(data.success);
                    if (data.success) {
                        navigate('/orders');
                        setCartItems({});
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            },
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    // Create a function to handle form submission
    const onSubmitHandler =  async (e) => {
        e.preventDefault();
        // console.log(formData);

        try {
            let orderItems = [];
            for( const items in cartItems){
                for(const item in cartItems[items]){
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            // console.log(orderItems);
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + deliveryFee
            }
            switch (method) {
                // Api calls for COD
                case 'cod':
                    const responseCOD = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: {token} });
                    // console.log(responseCOD.data.success);
                    if (responseCOD.data.success) {
                        setCartItems({});
                        navigate('/orders');
                    }else{
                        toast.error(responseCOD.data.message);
                    }
                    break;

                    case 'razorpay':
                        const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: {token} });
                        // console.log(responseRazorpay.data.success);
                        if (responseRazorpay.data.success) {
                            // console.log(responseRazorpay.data.order);
                            initPay(responseRazorpay.data.order);
                        }
                        break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
  return (
    <>
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200'>
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <div className="inline-flex gap-2 items-center mb-3">
                        <Title text1="DELIVERY" text2="INFORMATION" />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className="flex gap-3">
                            <input type="text" className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full text-sm' placeholder='First Name' name="firstName" value={formData.firstName} onChange={onchangeHandler} required />
                            <input type="text" className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full text-sm' placeholder='Last Name' name="lastName" value={formData.lastName} onChange={onchangeHandler} required />
                        </div>
                        <div>
                            <input type="text" className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full text-sm' placeholder='Email Address' name="email" value={formData.email} onChange={onchangeHandler} required />
                        </div>
                        <div>
                            <input type="text" className='border border-gray-300 out rounded py-1.5 px-3.5 w-full text-sm' placeholder='Street' name="street" value={formData.street} onChange={onchangeHandler} required />
                        </div>
                        <div className='flex gap-3'>
                            <input type="text" className='border border-gray-300 out rounded py-1.5 px-3.5 w-full text-sm' placeholder='City' name="city" value={formData.city} onChange={onchangeHandler} required />
                            <input type="text" className='border border-gray-300 out rounded py-1.5 px-3.5 w-full text-sm' placeholder='State' name="state" value={formData.state} onChange={onchangeHandler} required />
                        </div>
                        <div className='flex gap-3'>
                            <input type="number" className='border border-gray-300 out rounded py-1.5 px-3.5 w-full text-sm' placeholder='Zipcode' name="zipcode" value={formData.zipcode} onChange={onchangeHandler} required />
                            <input type="text" className='border border-gray-300 out rounded py-1.5 px-3.5 w-full text-sm' placeholder='Country' name="country" value={formData.country} onChange={onchangeHandler} required />
                        </div>
                        <div>
                            <input type="number" className='border border-gray-300 out rounded py-1.5 px-3.5 w-full text-sm' placeholder='Phone Number' name="phone" value={formData.phone} onChange={onchangeHandler} required />
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                <div className='mt-12'>
                    <Title text1="PAYMENT" text2="METHOD" />
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={()=> setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-200'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-200 ${method === 'stripe' ? 'bg-green-600' : ''}`}></p>
                            <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
                        </div>
                        <div onClick={()=> setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-200'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-200 ${method === 'razorpay' ? 'bg-green-600' : ''}`}></p>
                            <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
                        </div>
                        <div onClick={()=> setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-200'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-200 ${method === 'cod' ? 'bg-green-600' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>Cash On Delivery</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button type="submit" className="bg-black text-white px-16 py-3 text-sm cursor-pointer">PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form> 
    </>
  )
}

export default PlaceOrder;